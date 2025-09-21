import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    dropResults: [] // Add dropResults table
};

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
        },
        initialize: state => {
            state.value = 0;
            state.dropResults = [];
        },
        addDropResult: (state, action) => {
            state.dropResults.push(action.payload);
        },
        clearDropResults: state => {
            state.dropResults = [];
        }
    }
});

export const { increment, initialize, addDropResult, clearDropResults } = scoreSlice.actions;

export const selectScore = state => state.score.value;
export const selectDropResults = state => state.score.dropResults;

export default scoreSlice.reducer;