import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        visible: false,
        review: undefined,
        retention: undefined,
        points: {
            silver: undefined,
            gold: undefined,
            elite: undefined
        }
    },
    reducers: { 
        sidebarVisibility: (state, action) => {
            state.visible = action.payload;
        },
        fetchSettingsRequest: (state, action) => {},
        fetchSettingsSuccess: (state, action) => {
            const { review, retention, silver, gold, elite } = action.payload;
            state.review = review;
            state.retention = retention;
            state.points = { silver, gold, elite };
        },
        updateSettings: (state, action) => {
            const { tierReview, tierRetention, silver, gold, elite } = action.payload;
            state.review = tierReview;
            state.retention = tierRetention;
            state.points = { silver, gold, elite };
        }
    }
});

const {
    sidebarVisibility,
    fetchSettingsRequest,
    fetchSettingsSuccess,
    updateSettings
} = settingsSlice.actions;

export {
    sidebarVisibility,
    fetchSettingsRequest,
    fetchSettingsSuccess,
    updateSettings
};
export default settingsSlice.reducer;