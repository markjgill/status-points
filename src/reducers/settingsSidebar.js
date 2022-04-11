import { createSlice } from '@reduxjs/toolkit'

const settingsSidebarSlice = createSlice({
    name: 'settings',
    initialState: {
        visible: false,
        settings: {}
    },
    reducers: { 
        sidebarVisibility: (state, action) => {
            state.visible = action.payload;
        },
        updateSettings: (state, action) => {
            state.settings = action.payload;
        }
    }
});

const { sidebarVisibility, updateSettings } = settingsSidebarSlice.actions;

export { sidebarVisibility, updateSettings };
export default settingsSidebarSlice.reducer;