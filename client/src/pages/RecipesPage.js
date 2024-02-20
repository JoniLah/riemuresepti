import { useEffect, useState } from 'react';
import Recipe from '../components/Recipe/Recipe';
import axios from 'axios';
import Loader from '../components/Loader';

const RecipesPage = () => {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const controller = new AbortController();
                const response = await axios.get(process.env.REACT_APP_BASE_URL + "/api/recipes", {
                    signal: controller.signal
                });
                setRecipes(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setLoading(false);
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
            {loading ? <Loader /> : renderedRecipes}
        </div>
    );
};

export default RecipesPage;