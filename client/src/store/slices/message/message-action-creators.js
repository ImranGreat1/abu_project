import { messageActions } from './message-slice';

export const alertMessage = (payload) => {
  return (dispatch) => {
    dispatch(messageActions.addMessage(payload));

    const closeTime = payload.time ? payload.time : 5000;
    setTimeout(() => {
      dispatch(messageActions.clearMessage());
    }, closeTime);
  };
};
