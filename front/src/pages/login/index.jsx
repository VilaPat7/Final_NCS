import React, { useState } from "react";
import './login_page.css';
import API_BASE_URL from "../../api";

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
    
          const data = await response.json();
          if (data.success) {
            alert('Login successful!');
          } else {
            setError('Invalid username or password');
          }
        } catch (err) {
          setError('An error occurred');
        }
      };
    return(
        <div className="login_page">
        <form onSubmit={handleLogin} className="login_form">
        <p className="login_title">Login</p>
            <div className="login_content">
            <label className="login_label">Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login_input"
            />
            </div>
            <div className="login_content">
            <div><label className="login_label">Password:</label></div>
            <div><input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login_input"
            /></div>
            </div>
            <button type="submit" className="login_page_button">Login</button>
        </form>
        {error && <p className="error_message">{error}</p>}
        </div>
    )
}