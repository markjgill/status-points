import { createSlice } from '@reduxjs/toolkit'

const settingsSidebarSlice = createSlice({
    name: 'settings',
    initialState: {
        visible: false,
        settings: {
            points: {}
        }
    },
    reducers: { 
        sidebarVisibility: (state, action) => {
            state.visible = action.payload;
        },
        fetchSettingsRequest: (state, action) => {},
        fetchSettingsSuccess: (state, action) => {
            state.settings = action.payload;
        },
        updateSettings: (state, action) => {
            state.settings = { ...state.settings, ...action.payload };
        }
    }
});

const {
    sidebarVisibility,
    fetchSettingsRequest,
    fetchSettingsSuccess,
    updateSettings
} = settingsSidebarSlice.actions;

export {
    sidebarVisibility,
    fetchSettingsRequest,
    fetchSettingsSuccess,
    updateSettings
};
export default settingsSidebarSlice.reducer;