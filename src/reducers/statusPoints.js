import { createSlice } from '@reduxjs/toolkit'
import { append, sortBy, prop } from 'ramda';

const sortByDate = sortBy(prop("date"));

const statusPointsSlice = createSlice({
    name: 'status-points',
    initialState: {
        statusPoints: [],
        currentPoints: 0,
        currentTier: "none"
    },
    reducers: {
        addStatusPointsRequest: (state, action) => {},
        addStatusPointsSuccess: (state, action) => {
            state.statusPoints = sortByDate(append(action.payload, state.statusPoints));
        },
        fetchStatusPointsRequest: (state, action) => {},
        fetchStatusPointsSuccess: (state, action) => {
            state.statusPoints = sortByDate(action.payload);
        },
        setCurrentPoints: (state, action) => {
            state.currentPoints = action.payload;
        },
        setCurrentTier: (state, action) => {
            state.currentTier = action.payload;
        }
    }
});

const {
    addStatusPointsRequest,
    addStatusPointsSuccess,
    fetchStatusPointsRequest,
    fetchStatusPointsSuccess,
    setCurrentPoints,
    setCurrentTier
} = statusPointsSlice.actions;

export {
    addStatusPointsRequest,
    addStatusPointsSuccess,
    fetchStatusPointsRequest,
    fetchStatusPointsSuccess,
    setCurrentPoints,
    setCurrentTier
};
export default statusPointsSlice.reducer;