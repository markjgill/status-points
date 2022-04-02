import { createSlice } from '@reduxjs/toolkit'

const statusPointsSlice = createSlice({
    name: 'status-points',
    initialState: {
        statusPoints: [],
    },
    reducers: {
        addStatusPointsRequest: (stae, action) => {},
        addStatusPointsSuccess: (state, action) => {
            state.statusPoints.push(action.payload);
        },
        fetchStatusPointsRequest: (state, action) => {},
        fetchStatusPointsSuccess: (state, action) => {
            state.statusPoints = action.payload;
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