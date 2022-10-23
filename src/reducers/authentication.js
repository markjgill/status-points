import { createSlice } from '@reduxjs/toolkit'

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        idToken: undefined
    },
    reducers: { 
        setIdToken: (state, action) => {
            state.idToken = action.payload;
        },
        clearIdToken: (state) => {
            state.idToken = undefined;
        }
    }
});

const {
    setIdToken,
    clearIdToken
} = authenticationSlice.actions;

export {
    setIdToken,
    clearIdToken
};
export default authenticationSlice.reducer;