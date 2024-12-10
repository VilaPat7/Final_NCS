import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const addToCart = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <CartContext.Provider value={{ selectedItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};