import React, { useEffect } from 'react';
import MainLayout from './components/Layout/MainLayout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/slices/auth/auth-slice';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(authActions.login({ user, token }));
    }
  }, []);

  return (
    <div className="App">
      <MainLayout />
    </div>
  );
};

export default App;
