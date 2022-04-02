import { call, put, takeLatest } from 'redux-saga/effects'

import fetchStatusPoints from '../apis/fetchStatusPoints';
import { fetchStatusPointsRequest, fetchStatusPointsSuccess } from '../reducers/statusPoints';

const fetch = function* (action) {
    try {
        const statusPoints = yield call(fetchStatusPoints);
        yield put(fetchStatusPointsSuccess(statusPoints));
    } catch (e) {
        console.error(e);
    }
};

const fetchStatusPointsSaga = function* () {
    yield takeLatest(fetchStatusPointsRequest, fetch);
};

export default fetchStatusPointsSaga;