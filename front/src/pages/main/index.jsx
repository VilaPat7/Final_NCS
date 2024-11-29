import React, { useState } from "react";
import './main_page.css';
import { useNavigate } from 'react-router-dom';
import plantImage from '../../images/1.png';


export const MainPage = () => {
    const navigate = useNavigate();
    
    
    
    const handleButtonClick = () => {
        navigate('/new');
      };
    const handleButtonClick1 = () => {
        navigate('/new1');
      };
    const handleButtonClick2 = () => {
        navigate('/new2');
      };
    
    return(
        <div className="main">
            <button className="login_button" onClick={handleButtonClick}>Log in</button>
            <div className="main_page">

                <div className="first_block">
                    <p className="main_title">Houseplants store</p>
                    <p className="descr_text">Demonstration of SQL injection and buffer overflow 
                        vulnerabilities in the context of an online houseplants  
                        store.</p>
                    <div className="button_place">
                        <button className="first_button" onClick={handleButtonClick1}>Shopping cart</button>
                        <button className="second_button" onClick={handleButtonClick2}>Product search</button>
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