import { createSlice } from '@reduxjs/toolkit';

const initialState = { isAuthenticated: false };

const reducers = { 
  login(state) { state.isAuthenticated = true; },
  logout(state) { state.isAuthenticated = false }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers
});


export const authActions = authSlice.actions;

export default authSlice.reducer;