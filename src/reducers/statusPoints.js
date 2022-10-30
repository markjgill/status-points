import { createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon';
import { append, sortBy, prop } from 'ramda';

const sortByDate = sortBy(prop("date"));

const statusPointsSlice = createSlice({
    name: 'status-points',
    initialState: {
        statusPoints: [],
        currentPoints: 0,
        currentTier: "none",
        tierReachedDate: DateTime.fromMillis(0),
        pointsAfterTierReached: 0
    },
    reducers: {
        addStatusPointsRequest: (state, action) => {},
        addStatusPointsSuccess: (state, action) => {
            state.statusPoints = sortByDate(append(action.payload, state.statusPoints));
        },
        fetchStatusPointsRequest: (state, action) => {},
        fetchStatusPointsSuccess: (state, action) => {
            state.statusPoints = action.payload;
        },
        setCurrentPoints: (state, action) => {
            state.currentPoints = action.payload;
        },
        setCurrentTier: (state, action) => {
            state.currentTier = action.payload;
        },
        setTierReachedDate: (state, action) => {
            state.tierReachedDate = action.payload;
        },
        setPointsAfterTierReached: (state, action) => {
            state.pointsAfterTierReached = action.payload;
        }
    }
});

const {
    addStatusPointsRequest,
    addStatusPointsSuccess,
    fetchStatusPointsRequest,
    fetchStatusPointsSuccess,
    setCurrentPoints,
    setCurrentTier,
    setTierReachedDate,
    setPointsAfterTierReached
} = statusPointsSlice.actions;

export {
    addStatusPointsRequest,
    addStatusPointsSuccess,
    fetchStatusPointsRequest,
    fetchStatusPointsSuccess,
    setCurrentPoints,
    setCurrentTier,
    setTierReachedDate,
    setPointsAfterTierReached
};
export default statusPointsSlice.reducer;