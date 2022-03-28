import { configureStore } from '@reduxjs/toolkit'

import statusPointsReducer from '../reducers/statusPoints';

const store = configureStore({
    reducer: {
        statusPoints: statusPointsReducer
    }
});

export default store;