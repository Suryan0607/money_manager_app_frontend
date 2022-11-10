import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories : [],
    transaction: [],
    user:[]
}
export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers : {
        getTransactions: (state,action) => {
                // get code
        }
    }
})

export const { getTransactions } = expenseSlice.actions; 
export default expenseSlice.reducer;
