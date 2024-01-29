import React from 'react';
import './Recipe.scss';
import { CiTimer } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";

const Recipe = ({ id, title, imgPath, time, rating }) => {
    const handleOpenRecipe = (url) => {
        const newWindow = window.open(url, "_self", "noopener,noreferrer");
        if (newWindow) {
            newWindow.opener = null; // Avoid vulnerable code
        }
    };

    return (
        <div className="recipe" onClick={() => handleOpenRecipe("/reseptit/" + id)}>
            <div className="recipe__img-container">
                <div className="recipe__img-container__child" style={{backgroundImage: `url(${imgPath})` }}></div>
            </div>

            <div className="recipe__body">
                <div className="recipe__body-title">
                    <h3>{title}</h3>
                </div>
                
                <div className="recipe__body-info">
                    <div className="recipe__body-info__time">
                        <CiTimer />
                        {time}
                    </div>
                    <div className="recipe__body-info__rating">
                        <FaRegStar />
                        {rating}
                    </div>
                </div>
                
            </div>
            
        </div>
    );
};

export default Recipe;