import React, { useContext, useState } from "react";
import './search_page.css';
import { Element } from "../../components/element";
import plantImage from '../../images/1.png';
import { CartContext } from '../../components/provider';

export const SearchPage = () => {
    const { addToCart } = useContext(CartContext);
    const ListPlants = [
        {
            id: 1,
            plantName: "a",
            plantImage: plantImage
        },
        {
            id: 2,
            plantName: "b",
            plantImage: plantImage
        }
    ];
    // const handleSearch = async () => {
    //     try {
    //         const response = await fetch(`/api/search?q=${searchQuery}`);
    //         const data = await response.json();
    //         setPlants(data);
    //     } catch (err) {
    //         console.error('An error occurred', err);
    //     }
    // };

    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPlants = ListPlants.filter((plant) =>
        plant.plantName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filter === "all" ? true : plant.type === filter)
    );

    const handleSelect = (plant) => {
        addToCart(plant);
    
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
                {filteredPlants.map((plant) => (
                    <Element
                        key={plant.id}
                        plantID={plant.id}
                        plantTitle={plant.plantName}
                        plantImage={plant.plantImage}
                        plantClick={() => handleSelect(plant)}
                    />
                ))}
            </div>
        </div>
    );
}