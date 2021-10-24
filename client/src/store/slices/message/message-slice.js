import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  description: '',
  type: '',
  for: '',
  isOperational: null,
};

const reducers = {
  addMessage(state, action) {
    const { message, description, isOperational, type, forPage } =
      action.payload;

    state.type = type;
    state.message = message;
    state.description = description ? description : '';
    state.isOperational = isOperational ? isOperational : false;
    state.forPage = forPage;
  },

  clearMessage(state, action) {
    state.type = '';
    state.message = '';
    state.description = '';
    state.isOperational = null;
  },
};

const messageSlice = createSlice({ name: 'message', initialState, reducers });

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
