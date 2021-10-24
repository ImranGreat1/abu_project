import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

const reducers = {
  increment(state) { state.value++; },
  decrement(state) { state.value--; },
  increase(state, action) { state.value += action.payload; }
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;