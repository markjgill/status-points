import { put, takeLatest } from 'redux-saga/effects'

import { addStatusPointsRequest, addStatusPointsSuccess } from '../reducers/statusPoints';

const add = function* (action) {
    yield put(addStatusPointsSuccess(action.payload));
};

const addStatusPointsSaga = function* () {
    yield takeLatest(addStatusPointsRequest, add);
};

export default addStatusPointsSaga;