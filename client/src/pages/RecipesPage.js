import { useEffect, useState } from 'react';
import Recipe from '../components/Recipe/Recipe';
import axios from 'axios';

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const controller = new AbortController();
                const response = await axios.get("https://riemuresepti-api.onrender.com/api/recipes", {
                    // .get("https://localhost:5000/api/recipes", {
                    signal: controller.signal
                });
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };
    
        fetchData();
    
        // Clean up function
        return () => {
            const controller = new AbortController();
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