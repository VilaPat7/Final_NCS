import React, { useState, useContext } from "react";
import './cart_page.css';
import { CartContext } from '../../components/provider';



// export const CartPage = () => {
//     const { selectedItems } = useContext(CartContext);

//     return (
//         <div className="cart_page">
//             <p className="cart_title">Cart</p>
//             <div className="grid_cart">
//             {selectedItems.map((item) => (
//                 <div key={item.id} className="cart_item">
//                     <p className="cart_item_title">{item.plantName}</p>
//                     <img src={item.plantImage} alt={item.plantName} className="cart_item_image" />
//                 </div>
//             ))}
//             </div>
//         </div>
//     )
// }

export const CartPage = () => {
    const { selectedItems } = useContext(CartContext);

    console.log("Cart items:", selectedItems);

    return (
        <div className="cart_page">
            <p className="cart_title">Cart</p>
            <div className="grid_cart">
                {selectedItems.length > 0 ? (
                    selectedItems.map((item) => (
                        <div key={item.id} className="cart_item">
                            <p className="cart_item_title">{item.plantName}</p>
                            <img src={item.plantImage} alt={item.plantName} className="cart_item_image" />
                        </div>
                    ))
                ) : (
                    <p className="empty_cart">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};