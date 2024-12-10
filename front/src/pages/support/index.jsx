import React, { useState } from 'react';
import API_BASE_URL from "../../api";
import './support_page.css';

export const SupportPage = () => {
    const [input, setInput] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Sending input to server:', input); 

        try {
            const response = await fetch(`${API_BASE_URL}/support`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });

            console.log('Server response status:', response.status); 
            if (!response.ok) {
                console.error('Server returned an error:', await response.text());
            }
        } catch (err) {
            console.error('Request failed:', err); 
        }
    };

    return (
        <div className="support_page">
            <h2 className="support_title">Support Page</h2>
            <form className="support_form" onSubmit={handleSubmit}>
                <div>
                    <textarea
                        id="input"
                        className="support_input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type here..."
                    />
                </div>
                <button className="support_button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};
