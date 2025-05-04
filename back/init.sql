-- Create the database
-- CREATE DATABASE onlinestore IF NOT EXISTS;

-- Connect to the database
\c onlinestore;

-- Create the "Users" table
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create the "Products" table
CREATE TABLE IF NOT EXISTS Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL
);

-- Create the "Cart" table
CREATE TABLE IF NOT EXISTS Cart (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    quantity INT NOT NULL
);

-- Insert sample users
INSERT INTO Users (username, password)
VALUES
    ('admin', 'adminpassword'),
    ('user1', 'password1'),
    ('user2', 'password2');

-- Insert sample products
INSERT INTO Products (name, description, price, stock)
VALUES
    ('Product A', 'Description for Product A', 19.99, 100),
    ('Product B', 'Description for Product B', 29.99, 50),
    ('Product C', 'Description for Product C', 9.99, 200);

-- Insert sample cart entries
INSERT INTO Cart (user_id, product_id, quantity)
VALUES
    (1, 1, 2), -- User with ID 1 has 2 of Product a
    (2, 2, 1); -- User with ID 2 has 1 of Product b

