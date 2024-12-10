import React, { useContext, useState, useEffect } from "react";
import './search_page.css';
import { Element } from "../../components/element";
import { CartContext } from '../../components/provider';
import API_BASE_URL from "../../api";
import defaultImage from '../../images/1.png';

export const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching all products:", error);
            }
        };

        if (!searchQuery) {
            fetchAllProducts();
        }
    }, [searchQuery]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    // const handleSelect = (product) => {
    //     addToCart(product);
    // };
    const handleSelect = (product) => {
        addToCart({
            id: product.id,
            plantName: product.name,
            plantImage: defaultImage, // Pass the correct image
        });
    };

    return (
        <div className="search_page">
            <p className="search_title">Product Search</p>
            <div className="inputtt">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search_input"
            />
            <button onClick={handleSearch} className="serach_but">Search</button>
            </div>
            <div className="search_grid">
                {products.map((product) => (
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
