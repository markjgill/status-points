import { all } from "redux-saga/effects"

import addStatusPointsSaga from "./addStatusPoints"
import fetchSettingsSaga from "./fetchSettings";
import fetchStatusPointsSaga from "./fetchStatusPoints"

const rootSaga = function* () {
    yield all([
        addStatusPointsSaga(),
        fetchStatusPointsSaga(),
        fetchSettingsSaga()
    ]);
};

export default rootSaga;