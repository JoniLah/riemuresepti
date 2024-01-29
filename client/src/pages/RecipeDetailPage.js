import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeDetailPage.scss';
import { IoMdTimer } from "react-icons/io";
import { CiForkAndKnife } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";

const RecipeDetailPage = () => {
    const params = useParams();
    const [recipe, setRecipe] = useState({
        title: '',
        imgPath: '',
        time: '',
        brief: '',
        type: '',
        portions: 0,
        ingredients: [],
        instructions: [],
        tags: [],
        rating: 0
    });

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/recipes/${params.id}`)
            .then(res => {
                setRecipe(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [params.id]);

    const renderedIngredients = recipe.ingredients.map((ingredient, index) => {
        if (!recipe.ingredients || !Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
            return <p>Ladataan reseptiä...</p>
        }

        return (
            <tr style={{margin: "15px"}} key={index}>
                <td>{ingredient.amount} {ingredient.unit}</td>
                <td>{ingredient.name}</td>
            </tr>
        );
    });

    const renderedInstructions = recipe.instructions.map((instruction, index) => {
        if (!recipe.instructions || !Array.isArray(recipe.instructions) || recipe.instructions.length === 0) {
            return <p>Ladataan ohjeita...</p>
        }

        return (
            <div key={index} className="d-flex flex-row py-4">
                <span className="recipe-detail__description-step-number">{instruction.stepNumber}</span>
                <span className="recipe-detail__description-description">{instruction.description}</span>
            </div>
        );
    });

    return (
        <div>
            {console.log(recipe.imgPath)}
            <div className="recipe-detail__background-container">
                <div className="recipe-detail__background-container__img" style={{ backgroundImage: `url(../${recipe.imgPath})` }}></div>
            </div>

            <div className="px-3">
                <div className="recipe-detail__icons">
                    <div><IoMdTimer className="green" /> {recipe.time}</div>
                    <div><CiForkAndKnife className="orange" /> {recipe.type}</div>
                    <div><IoPricetagOutline className="blue" /></div>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <div className="d-flex align-items-center flex-column" style={{width: "620px"}}>
                        <h1>{recipe.title}</h1>
                        <div className="text-center">{recipe.brief}</div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-4">
                        <div className="recipe-detail__ingredients">
                            <table className="w-100">
                                <thead>
                                    <tr>
                                        <th><h3>Ainekset</h3></th>
                                        <th>Annoskoko: {recipe.portions}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderedIngredients}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="recipe-detail__description">
                            <h3>Valmistusohjeet</h3>
                            {renderedInstructions}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailPage;