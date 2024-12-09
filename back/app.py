import ctypes
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS
from sqlalchemy.sql import text  # Import text for raw SQL

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/onlinestore'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

vulnerable_lib = ctypes.CDLL('./libvulnerable.so')

# Define Product model
class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=True)

# Routes
@app.route('/')
def home():
    return 'Welcome to the Online Store API!'

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username', '')
    password = data.get('password', '')

    try:
        # Уязвимый SQL-запрос
        query = text(f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'")
        result = db.session.execute(query).fetchone()

        if result:
            return jsonify({'success': True, 'message': 'Login successful!'})
        else:
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        products = Product.query.all()
        return jsonify([{
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'description': product.description
        } for product in products])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify({
        'id': product.id,
        'name': product.name,
        'price': product.price,
        'description': product.description
    })

@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.json
    new_product = Product(
        name=data.get('name'),
        price=data.get('price'),
        description=data.get('description')
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully'}), 201

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    data = request.json
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.description = data.get('description', product.description)
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'})

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})

@app.route('/api/products/search', methods=['GET'])
def search_products():
    search_query = request.args.get('q', '')  # Get the 'q' parameter from the frontend
    try:
        # Vulnerable query (DO NOT use in production)
        query = text(f"SELECT * FROM products WHERE name LIKE '%{search_query}%'")
        result = db.session.execute(query).fetchall()
        products = [{"id": row[0], "name": row[1], "price": row[2], "description": row[3]} for row in result]
        return jsonify(products)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/support', methods=['POST'])
def vulnerable_c():
    user_input = request.json.get('input', '')

    try:
        c_input = ctypes.create_string_buffer(user_input.encode('utf-8'))

        vulnerable_lib.vulnerable_function(c_input)

        return jsonify({'message': 'Function executed successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Ensure the database and tables are created
    with app.app_context():
        db.create_all()

    # Run the app
    app.run(debug=True)
