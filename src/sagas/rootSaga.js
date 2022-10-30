import { all } from "redux-saga/effects"

import addStatusPointsSaga from "./addStatusPoints"

const rootSaga = function* () {
    yield all([
        addStatusPointsSaga(),
    ]);
};

export default rootSaga;