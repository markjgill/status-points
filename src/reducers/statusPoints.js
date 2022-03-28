import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'status-points',
    initialState: {
        value: [],
    },
    reducers: {
        add: (state, action) => {
            state.value.push(action.payload);
        }
    }
});

const { add } = counterSlice.actions;

export { counterSlice, add };
export default counterSlice.reducer;