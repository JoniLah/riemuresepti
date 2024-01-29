import { configureStore } from '@reduxjs/toolkit';
import { allergiesReducer, addAllergy, removeAllergy } from './slices/allergiesSlice';

const store = configureStore({
    reducer: {
        allergies: allergiesReducer
    }
});

export { store, allergiesReducer };