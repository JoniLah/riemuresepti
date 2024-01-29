import { createSlice } from '@reduxjs/toolkit';

const allergiesSlice = createSlice({
    name: "allergy",
    initialState: [],
    reducers: {
        addAllergy: (state, action) => {
            state.push(action.payload);
        },
        removeAllergy: (state, action) => {
            const index = state.indexOf(action.payload);
            state.splice(index, 1);
        }
    }
});

export const { addAllergy, removeAllergy } = allergiesSlice.actions;
export const allergiesReducer = allergiesSlice.reducer;