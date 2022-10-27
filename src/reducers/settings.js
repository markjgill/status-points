import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        visible: false,
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
            const { retention, silver, gold, elite } = action.payload;
            state.retention = retention;
            state.points = { silver, gold, elite };
        },
        updateSettings: (state, action) => {
            const { tierRetention, silver, gold, elite } = action.payload;
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