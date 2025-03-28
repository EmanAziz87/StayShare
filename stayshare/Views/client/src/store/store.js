import { configureStore } from '@reduxjs/toolkit'
import choreDueDatesReducer from './slices/choreDueDatesSlice.js';
import choreCompletionRecordsReducer from './slices/choreCompletionRecordsSlice.js';

export default configureStore({
    reducer: {
        choreDueDates: choreDueDatesReducer,
        choreCompletionRecords: choreCompletionRecordsReducer
    }
})