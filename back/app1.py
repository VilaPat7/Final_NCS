from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        dbname="onlinestore",
        user="vika",
        password="vika",
        host="localhost",
        port="5432"
    )
    return conn

# Home route
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Online Store!"})

# Product search with SQL injection vulnerability
@app.route('/search', methods=['GET'])
def search():
    search_term = request.args.get('query', '')
    conn = get_db_connection()
    cur = conn.cursor()
    # Vulnerable query
    query = f"SELECT * FROM products WHERE name LIKE '%{search_term}%'"
    try:
        cur.execute(query)
        results = cur.fetchall()
        return jsonify({"products": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cur.close()
        conn.close()

# Secure version of the product search (to demonstrate the fix)
@app.route('/secure_search', methods=['GET'])
def secure_search():
    search_term = request.args.get('query', '')
    conn = get_db_connection()
    cur = conn.cursor()
    # Secure query with parameterized queries
    query = "SELECT * FROM products WHERE name LIKE %s"
    try:
        cur.execute(query, (f"%{search_term}%",))
        results = cur.fetchall()
        return jsonify({"products": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cur.close()
        conn.close()

# Login form with buffer overflow vulnerability
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username', '')
    password = request.form.get('password', '')
    
    # Simulating buffer overflow vulnerability
    if len(username) > 50:  # Vulnerability trigger point
        return jsonify({"error": "Buffer overflow detected!"}), 400
    
    conn = get_db_connection()
    cur = conn.cursor()
    # Simplified authentication logic
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    try:
        cur.execute(query, (username, password))
        user = cur.fetchone()
        if user:
            return jsonify({"message": "Login successful", "user": user})
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cur.close()
        conn.close()

# Shopping cart with SQL injection vulnerability
@app.route('/cart', methods=['GET', 'POST'])
def cart():
    user_id = request.args.get('user_id', '')
    conn = get_db_connection()
    cur = conn.cursor()
    
    if request.method == 'GET':
        # Vulnerable query
        query = f"SELECT * FROM carts WHERE user_id = {user_id}"
        try:
            cur.execute(query)
            cart_items = cur.fetchall()
            return jsonify({"cart": cart_items})
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        finally:
            cur.close()
            conn.close()
    
    elif request.method == 'POST':
        product_id = request.form.get('product_id', '')
        quantity = request.form.get('quantity', 1)
        # Vulnerable insert query
        query = f"INSERT INTO carts (user_id, product_id, quantity) VALUES ({user_id}, {product_id}, {quantity})"
        try:
            cur.execute(query)
            conn.commit()
            return jsonify({"message": "Item added to cart"})
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        finally:
            cur.close()
            conn.close()

# Secure version of the cart (to demonstrate the fix)
@app.route('/secure_cart', methods=['GET', 'POST'])
def secure_cart():
    user_id = request.args.get('user_id', '')
    conn = get_db_connection()
    cur = conn.cursor()
    
    if request.method == 'GET':
        # Secure query
        query = "SELECT * FROM carts WHERE user_id = %s"
        try:
            cur.execute(query, (user_id,))
            cart_items = cur.fetchall()
            return jsonify({"cart": cart_items})
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        finally:
            cur.close()
            conn.close()
    
    elif request.method == 'POST':
        product_id = request.form.get('product_id', '')
        quantity = request.form.get('quantity', 1)
        # Secure insert query
        query = "INSERT INTO carts (user_id, product_id, quantity) VALUES (%s, %s, %s)"
        try:
            cur.execute(query, (user_id, product_id, quantity))
            conn.commit()
            return jsonify({"message": "Item added to cart"})
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        finally:
            cur.close()
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)
