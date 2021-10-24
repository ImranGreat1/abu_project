import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');

const initialState = {
  token: initialToken,
  isAuthenticated: !!initialToken,
  isLoading: false,
  hasError: false,
  data: null,
};

const reducers = {
  login(state, action) {
    state.token = action.payload.token;
    state.isAuthenticated = true;
    state.isLoading = false;
    state.hasError = false;
    state.data = action.payload.user;
  },
  logout(state, action) {
    state.token = null;
    state.isAuthenticated = false;
    state.isLoading = false;
    state.hasError = false;
  },
  loading(state, action) {
    state.isLoading = true;
    state.hasError = false;
  },
  error(state, action) {
    state.hasError = true;
    state.isLoading = false;
    state.data = action.payload;
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers,
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
