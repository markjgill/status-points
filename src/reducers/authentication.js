import { createSlice } from '@reduxjs/toolkit'

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        idToken: undefined,
        identityProvider: undefined
    },
    reducers: { 
        setAuthentication: (state, action) => {
            const { idToken, identityProvider } = action.payload;
            state.idToken = idToken;
            state.identityProvider = identityProvider;
        },
        clearAuthentication: (state) => {
            state.idToken = undefined;
            state.identityProvider = undefined;
        }
    }
});

const {
    setAuthentication,
    clearAuthentication
} = authenticationSlice.actions;

const identityProviders = {
    GOOGLE: "accounts.google.com"
};

export {
    setAuthentication,
    clearAuthentication,
    identityProviders
};
export default authenticationSlice.reducer;