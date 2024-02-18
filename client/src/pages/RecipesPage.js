import { useEffect, useState } from 'react';
import Recipe from '../components/Recipe/Recipe';
import axios from 'axios';

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        axios
            // .get("http://localhost:5000/api/recipes", {
            .get("https://localhost:5000/api/recipes", {
                signal: controller.signal
            })
            .then(res => {
                console.log(res);
                setRecipes(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        
        // Clean up function
        return () => {
            controller.abort();
        };
    }, []);

    const renderedRecipes = recipes.map((recipe) => {
        return <Recipe key={recipe._id} id={recipe._id} title={recipe.title} imgPath={recipe.imgPath} time={recipe.time?.label} rating={recipe.rating} />;
    });

    return (
        <div className="d-flex justify-content-space-between flex-wrap align-items-center">
            {renderedRecipes}
        </div>
    );
};

export default RecipesPage;