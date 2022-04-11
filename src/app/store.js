import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import statusPointsReducer from '../reducers/statusPoints';
import settingsSidebarReducer from '../reducers/settingsSidebar';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        statusPoints: statusPointsReducer,
        settingsSidebar: settingsSidebarReducer
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;