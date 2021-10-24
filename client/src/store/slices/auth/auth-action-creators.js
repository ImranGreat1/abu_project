import { authActions } from './auth-slice';
import urls from '../../../utils/urls';
import sendRequest from '../../../utils/send-request';
import { messageActions } from '../message/message-slice';

// CUSTOM ACTION CREATORS

const handleSuccessResponse = (data, dispatch) => {
  // Set token in local storage
  localStorage.setItem('token', `Bearer ${data.token}`);
  dispatch(
    authActions.login({
      user: data.data,
      token: `Bearer ${data.token}`,
    })
  );
};

const handleAuthenticationResponse = async (url, data, dispatch) => {
  dispatch(authActions.loading());

  const responseData = await sendRequest(url, {
    method: 'post',
    data,
  });

  if (responseData.status === 'success') {
    const message = {
      message: 'Login Successfully',
      description: 'You have successfully logged in.',
    };
    // Send feedback to user
    dispatch(messageActions.addMessage(message));

    // Handle success response data
    handleSuccessResponse(responseData.data, dispatch);
  }

  if (responseData.status === 'error') {
    // Dispatch error if login is not successful
    dispatch(authActions.error(responseData.data));
  }
};

// LOGIN
export const authenticateUser = (data) => {
  return async (dispatch) => {
    handleAuthenticationResponse(urls.login, data, dispatch);
  };
};

// SIGN UP
export const registerUser = (data) => {
  return async (dispatch) => {
    handleAuthenticationResponse(urls.signup, data, dispatch);
  };
};

// LOGOUT
export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(authActions.logout());
  };
};
