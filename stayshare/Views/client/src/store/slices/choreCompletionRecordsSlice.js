import {createSlice} from "@reduxjs/toolkit";

const choreCompletionRecordsSlice = createSlice({
    name: 'choreCompletionRecords',
    initialState: [],
    reducers: {
        choreCompletionRecords(state, action) {
            return action.payload;
        }
    },

})

export const {choreCompletionRecords} = choreCompletionRecordsSlice.actions;
export default choreCompletionRecordsSlice.reducer;