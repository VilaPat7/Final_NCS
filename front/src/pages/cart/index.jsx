import React, { useState, useContext, useEffect } from "react";
import './cart_page.css';
import { CartContext } from '../../components/provider';

export const CartPage = () => {
    const { selectedItems } = useContext(CartContext);
    const [cartBuffer, setCartBuffer] = useState([]);
    const bufferLimit = 10;  

    useEffect(() => {
        const simulatedBuffer = new Array(bufferLimit).fill(null);  
        selectedItems.forEach((item, index) => {
            if (index < bufferLimit) {
                simulatedBuffer[index] = item;
            } else {
                console.warn(`Buffer overflow: Adding item ${item.plantName} beyond the limit!`);
            }
        });

        setCartBuffer(simulatedBuffer);
    }, [selectedItems]);

    return (
        <div className="cart_page">
            <p className="cart_title">Cart</p>
            <div className="grid_cart">
                {cartBuffer.length > 0 ? (
                    cartBuffer.map((item, index) => (
                        item && (
                            <div key={index} className="cart_item">
                                <p className="cart_item_title">{item.plantName}</p>
                                <img src={item.plantImage} alt={item.plantName} className="cart_item_image" />
                            </div>
                        )
                    ))
                ) : (
                    <p className="empty_cart">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};
