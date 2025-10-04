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
            debugger;
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

// Thunk to get current dropResults (returns a function for dispatch)
export const fetchCurrentDropResults = () => (dispatch, getState) => {
    const dropResults = getState().score.dropResults;
    return dropResults;
};

export const resetScore = () => (dispatch) => {
    dispatch(initialize());
};

export default scoreSlice.reducer;