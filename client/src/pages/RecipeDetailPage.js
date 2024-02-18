import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeDetailPage.scss';
import { IoMdTimer } from "react-icons/io";
import { CiForkAndKnife } from "react-icons/ci";
import Skeleton from '../components/Skeleton';

const RecipeDetailPage = () => {
    const params = useParams();
    const [recipe, setRecipe] = useState({
        title: '',
        imgPath: '',
        time: [],
        brief: '',
        type: [],
        portions: 0,
        ingredients: [],
        instructions: [],
        tags: [],
        allergens: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/recipes/${params.id}`)
            .then(res => {
                setRecipe(res.data);
                setLoading(false);
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

    const renderedAllergens = recipe.allergens.map((allergen, index) => {
        if (!recipe.allergens || !Array.isArray(recipe.allergens) || recipe.allergens.length === 0) {
            return;
        }

        return (
            <span key={index} className="badge rounded-pill bg-warning mx-1 hover:cursor-default" title="Allergeeni">{allergen.label}</span>
        );
    });

    const renderedTags = recipe.tags.map((tag, index) => {
        if (!recipe.tags || !Array.isArray(recipe.tags) || recipe.tags.length === 0) {
            return;
        }

        return (
            <span key={index} className="badge rounded-pill bg-secondary mx-1 hover:cursor-default" title="Avainsana">{tag.label}</span>
        );
    });

    return (
        <div>
            <div className="recipe-detail__background-container">
                <div className="recipe-detail__background-container__img" style={{ backgroundImage: `url(${recipe.imgPath})` }}></div>
            </div>

            <div className="px-3">
                <div className="d-flex justify-content-center flex-column items-center my-3">
                    <div className="d-flex align-items-center flex-column" style={{width: "620px"}}>
                        <h1>{loading ? <Skeleton times={1} className="h-10 w-full" /> : recipe.title}</h1>
                        <div className="text-center">{loading ? <Skeleton times={1} className="h-10 w-full" /> : recipe.brief}</div>
                    </div>

                    <div className="flex flex-column my-3">
                        <div className="flex flex-row">
                            {renderedAllergens}
                            {renderedTags}
                        </div>
                    </div>

                    <div className="recipe-detail__icons">
                        <div><IoMdTimer className="green" /> {recipe.time.label}</div>
                        <div><CiForkAndKnife className="orange" /> {recipe.type.label}</div>
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