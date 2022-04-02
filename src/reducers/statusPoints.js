import { createSlice } from '@reduxjs/toolkit'
import { append, sortBy, prop } from 'ramda';

const sortByDate = sortBy(prop("date"));

const statusPointsSlice = createSlice({
    name: 'status-points',
    initialState: {
        statusPoints: []
    },
    reducers: {
        addStatusPointsRequest: (state, action) => {},
        addStatusPointsSuccess: (state, action) => {
            state.statusPoints = sortByDate(append(action.payload, state.statusPoints));
        },
        fetchStatusPointsRequest: (state, action) => {},
        fetchStatusPointsSuccess: (state, action) => {
            state.statusPoints = sortByDate(action.payload);
        }
    }
});

const {
    addStatusPointsRequest,
    addStatusPointsSuccess,
    fetchStatusPointsRequest,
    fetchStatusPointsSuccess
} = statusPointsSlice.actions;

export {
    addStatusPointsRequest,
    addStatusPointsSuccess,
    fetchStatusPointsRequest,
    fetchStatusPointsSuccess
};
export default statusPointsSlice.reducer;