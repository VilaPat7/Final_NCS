import React, { useState } from "react";
import './main_page.css';
import { useNavigate } from 'react-router-dom';
import plantImage from '../../images/1.png';


export const MainPage = () => {
    const navigate = useNavigate();
    
    
    
    const handleButtonClickLogin = () => {
        navigate('/login');
      };
    const handleButtonClickCart = () => {
        navigate('/cart');
      };
    const handleButtonClickSearch = () => {
        navigate('/search');
      };
    const handleButtonClickSupport = () => {
        navigate('/support');
      };
    
    return(
        <div className="main">
            <button className="login_button" onClick={handleButtonClickLogin}>Log in</button>
            <div className="main_page">

                <div className="first_block">
                    <p className="main_title">Houseplants store</p>
                    <p className="descr_text">Demonstration of SQL injection and buffer overflow 
                        vulnerabilities in the context of an online houseplants  
                        store.</p>
                    <div className="button_place">
                        <button className="first_button" onClick={handleButtonClickCart}>Shopping cart</button>
                        <button className="second_button" onClick={handleButtonClickSearch}>Product search</button>
                        <button className="support_button" onClick={handleButtonClickSupport}>Support</button>
                    </div>
                </div>
                <div className="second_block">
                    <img 
                    src={plantImage} 
                    alt="Main plant imag"
                    className="image_main" 
                    />
                </div>
            </div>
        </div>
    );
}