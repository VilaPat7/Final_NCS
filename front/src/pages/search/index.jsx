import React, { useContext, useState, useEffect } from "react";
import './search_page.css';
import { Element } from "../../components/element";
import { CartContext } from '../../components/provider';
import API_BASE_URL from "../../api"; // Make sure this points to your backend API
import defaultImage from '../../images/1.png';


export const SearchPage = () => {
    const { addToCart } = useContext(CartContext); // Context for adding items to cart
    const [products, setProducts] = useState([]); // State to hold products from the database
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [filter, setFilter] = useState("all"); // Optional filter state (if applicable)

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data); // Store fetched products in state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on search query and optional filter
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filter === "all" ? true : product.type === filter)
    );

    // Add product to cart
    const handleSelect = (product) => {
        addToCart(product);
    };

    return (
        <div className="search_page">
            <p className="search_title">Product Search</p>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search_input"
            />
            <div className="search_grid">
                {filteredProducts.map((product) => (
                    <Element
                        key={product.id}
                        plantTitle={product.name}
                        plantImage={defaultImage} 
                        plantClick={() => handleSelect(product)}
                    />
                ))}
            </div>
        </div>
    );
};
