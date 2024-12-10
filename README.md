# Vulnerable Online Store

This project is a demonstration of an intentionally vulnerable online store designed for educational purposes. The application includes vulnerabilities such as SQL injection and buffer overflow, providing hands-on experience in understanding, exploiting, and mitigating these security issues.

---

## **Getting Started**

Follow the steps below to set up and run the application locally.

### **Prerequisites**
Ensure you have the following installed on your system:
- Python 3.x
- PostgreSQL
- npm (Node.js)
- pip (Python package installer)

---

### **Setup Instructions**

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/VilaPat7/Final_NCS.git
   cd Final_NCS
   ```

2. **Install Backend Dependencies**  
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the Backend Server**  
   ```bash
   cd back
   python3 app.py
   ```

4. **Initialize the Database**  
   Log in to PostgreSQL and execute the initialization script:
   ```bash
   psql -U <username> -f init.sql
   ```
   Replace `<username>` with your PostgreSQL username.

5. **Configure Backend Credentials**  
   Open the `app.py` file and update the database username and password:
   ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://<username>:<password>@localhost/onlinestore'

   ```

6. **Start the Frontend**  
   ```bash
   cd ../front
   npm start
   ```

---

### **Features**
- **Vulnerabilities Implemented**:
  - SQL Injection in product search and login functionality.
  - Buffer Overflow in the support feature.

- **Educational Objectives**:
  - Demonstrate exploitation of vulnerabilities.
  - Teach secure coding practices by showing fixes.

---
