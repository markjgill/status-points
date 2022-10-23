import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import authenticationReducer from '../reducers/authentication';
import statusPointsReducer from '../reducers/statusPoints';
import settingsReducer from '../reducers/settings';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        statusPoints: statusPointsReducer,
        settings: settingsReducer
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;