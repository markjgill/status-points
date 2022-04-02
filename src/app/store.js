import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import statusPointsReducer from '../reducers/statusPoints';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        statusPoints: statusPointsReducer
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;