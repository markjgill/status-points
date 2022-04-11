import { call, put, takeLatest } from 'redux-saga/effects'

import fetchSettings from '../apis/fetchSettings';
import { fetchSettingsRequest, fetchSettingsSuccess } from '../reducers/settingsSidebar';

const fetch = function* (action) {
    try {
        const settings = yield call(fetchSettings);
        yield put(fetchSettingsSuccess(settings));
    } catch (e) {
        console.error(e);
    }
};

const fetchSettingsSaga = function* () {
    yield takeLatest(fetchSettingsRequest, fetch);
};

export default fetchSettingsSaga;