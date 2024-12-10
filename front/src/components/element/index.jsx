import React, { useState } from "react";
import './element.css';

export const Element = ({ plantID, plantTitle, plantImage, plantClick }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        plantClick();
    };

    return (
        <div className="element_block">
            <p className="element_title">{plantTitle}</p>
            <img
                className={`element_image ${isClicked ? 'clicked' : ''}`}
                src={plantImage}
                alt={`picture with ${plantTitle}`}
            />
            <button
                className={`element_button ${isClicked ? 'clicked' : ''}`}
                onClick={handleClick}
            >
                Select
            </button>
        </div>
    );
}