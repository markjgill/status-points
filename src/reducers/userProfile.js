import { createSlice } from '@reduxjs/toolkit'

const userProfileSlice = createSlice({
    name: 'user-profile',
    initialState: {
        name: undefined,
        email: undefined
    },
    reducers: { 
        setUserProfile: (state, action) => {
            const { name, email } = action.payload;
            state.name = name;
            state.email = email;
        },
        clearUserProfile: (state) => {
            state.name = undefined;
            state.email = undefined;
        }
    }
});

const {
    setUserProfile,
    clearUserProfile
} = userProfileSlice.actions;

export {
    setUserProfile,
    clearUserProfile
};
export default userProfileSlice.reducer;