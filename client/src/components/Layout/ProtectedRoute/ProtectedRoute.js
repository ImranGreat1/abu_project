import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { messageActions } from '../../../store/slices/message/message-slice';
import { alertMessage } from '../../../store/slices/message/message-action-creators';

const ProtectedRoute = ({ children, page }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    const message = {
      message: 'Authentication required!',
      description: `Login in to access ${page.name}`,
      time: 10000,
      forPage: 'login',
    };
    dispatch(alertMessage(message));
    // dispatch(messageActions.addMessage(message));
    return <Redirect to={`/auth/login?redirect=${page.url}`} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
