import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { allergiesReducer, addAllergy, removeAllergy } from './slices/allergiesSlice';
import { recipesApi } from './apis/recipesApi';

const store = configureStore({
    reducer: {
        allergies: allergiesReducer,
        [recipesApi.reducerPath]: recipesApi.reducer,
    },
    middleware: (getDefaultMiddleWare) => {
        return getDefaultMiddleWare().concat(recipesApi.middleware);
    },
    devTools: false
});

setupListeners(store.dispatch);

export { store, allergiesReducer };
export { useFetchRecipesQuery, useAddRecipeMutation, useRemoveRecipeMutation, useUpdateRecipeMutation } from './apis/recipesApi';