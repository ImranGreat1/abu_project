import { useDispatch, useSelector } from 'react-redux';
import Auth from "./Auth";
import Counter from "./Counter";
import { authActions } from '../../reduxStore/slices/auth';

const Redux = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const loginHandler = () => dispatch(authActions.login());
  const logoutHandler = () => dispatch(authActions.logout());

  return (
    <div style={{ padding: '3rem'}}>
      <div style={{ padding: '3rem' }}>
        { !isAuthenticated ?
        <button onClick={loginHandler}>Login</button> :
        <button onClick={logoutHandler}>Logout</button>
        }
        { isAuthenticated && <Auth /> }
      </div>
      <Counter />
    </div>
  );
}

export default Redux;