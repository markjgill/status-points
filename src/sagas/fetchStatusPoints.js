import { DateTime } from 'luxon';
import { call, put, takeLatest } from 'redux-saga/effects'

import fetchStatusPoints from '../apis/fetchStatusPoints';
import { fetchStatusPointsRequest, fetchStatusPointsSuccess } from '../reducers/statusPoints';

const fetch = function* (action) {
    try {
        const fromDate = DateTime.now().startOf("day").minus({ years: 1 });
        const statusPoints = yield call(fetchStatusPoints, fromDate);
        yield put(fetchStatusPointsSuccess(statusPoints));
    } catch (e) {
        console.error(e);
    }
};

const fetchStatusPointsSaga = function* () {
    yield takeLatest(fetchStatusPointsRequest, fetch);
};

export default fetchStatusPointsSaga;