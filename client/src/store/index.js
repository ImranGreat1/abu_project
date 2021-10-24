import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/auth-slice';
import messageReducer from './slices/message/message-slice';

const reducers = { auth: authReducer, message: messageReducer };

const store = configureStore({ reducer: reducers });

export default store;
