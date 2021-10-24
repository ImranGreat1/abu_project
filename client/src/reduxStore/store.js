import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';
import authReducer from './slices/auth';


const reducers = { counter: counterReducer, auth: authReducer };

const store = configureStore({ reducer: reducers });


export default store;