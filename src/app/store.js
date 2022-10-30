import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "../reducers/authentication";
import statusPointsReducer from "../reducers/statusPoints";
import settingsReducer from "../reducers/settings";
import userProfileReducer from "../reducers/userProfile";

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        statusPoints: statusPointsReducer,
        settings: settingsReducer,
        userProfile: userProfileReducer
    }
});

export default store;