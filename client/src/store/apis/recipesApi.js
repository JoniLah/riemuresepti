import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const recipesApi = createApi({
    reducerPath: "recipes",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:5000"
        baseUrl: "https://riemuresepti-api.onrender.com"
    }),
    endpoints(builder) {
        return {
            fetchRecipes: builder.query({
                query: (recipe) => {
                    return {
                        url: "/recipes",
                        method: "GET",
                        params: {
                            _id: recipe.id
                        }
                    };
                }
            }),
            addRecipe: builder.mutation({
                query: (recipe) => {
                    return {
                        url: "/recipes",
                        method: "POST",
                        body: {
                            title: recipe.title,
                            imgPath: recipe.imgPath,
                            time: recipe.time,
                            brief: recipe.brief,
                            portions: recipe.portions,
                            ingredients: recipe.ingredients,
                            instructions: recipe.instructions,
                            type: recipe.type,
                            tags: recipe.tags
                        }
                    };
                }
            }),
            removeRecipe: builder.mutation({
                query: (recipe) => {
                    return {
                        url: `/recipes/${recipe.id}`,
                        method: "DELETE"
                    };
                }
            }),
            updateRecipe: builder.mutation({
                query: (recipe) => {
                    return {
                        url: `/recipes/${recipe.id}`,
                        method: "PUT",
                        body: {
                            title: recipe.title,
                            imgPath: recipe.imgPath,
                            time: recipe.time,
                            brief: recipe.brief,
                            portions: recipe.portions,
                            ingredients: recipe.ingredients,
                            instructions: recipe.instructions,
                            type: recipe.type,
                            tags: recipe.tags
                        }
                    };
                }
            })
        }
    }
});

export const {
    useFetchRecipesQuery,
    useAddRecipeMutation,
    useRemoveRecipeMutation,
    useUpdateRecipeMutation
} = recipesApi;
export { recipesApi };