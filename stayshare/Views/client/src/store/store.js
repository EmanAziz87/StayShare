import { configureStore } from '@reduxjs/toolkit'
import choreDueDatesReducer from './slices/choreDueDatesSlice.js';

export default configureStore({
    reducer: {
        choreDueDates: choreDueDatesReducer
    }
})