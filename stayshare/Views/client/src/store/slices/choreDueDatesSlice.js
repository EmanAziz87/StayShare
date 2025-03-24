import {createSlice} from "@reduxjs/toolkit";

const choreDueDatesSlice = createSlice({
    name: 'choreDueDates',
    initialState: [],
    reducers: {
        dueDatesForAllChores(state, action) {
            return action.payload;
        }
    },
    
})

export const {dueDatesForAllChores} = choreDueDatesSlice.actions;
export default choreDueDatesSlice.reducer;