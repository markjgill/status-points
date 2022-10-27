import { all } from "redux-saga/effects"

import addStatusPointsSaga from "./addStatusPoints"
import fetchStatusPointsSaga from "./fetchStatusPoints"

const rootSaga = function* () {
    yield all([
        addStatusPointsSaga(),
        fetchStatusPointsSaga()
    ]);
};

export default rootSaga;