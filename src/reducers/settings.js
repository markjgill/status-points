import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        visible: false,
        currentTier: undefined,
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
            const { tier, points } = action.payload;
            state.currentTier = tier;
            state.points = points;
        },
        updateSettings: (state, action) => {
            const { tier, silver, gold, elite } = action.payload;
            state.currentTier = tier;
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