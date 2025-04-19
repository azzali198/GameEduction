import {createSlice} from '@reduxjs/toolkit'
const initialState = {
value : 0
}


export const scoreSlice = createSlice({
name : 'score',
initialState,
reducers :{
    increment : state => {
        state.value 
        += 1
    },
    initialize : state => {
        state.value 
        = 0
    }


}


})

export const {increment,initialize} = scoreSlice.actions;

export const selectScore = state => state.score.value

export default scoreSlice.reducer