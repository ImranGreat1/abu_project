import classes from './SideNav.module.css';
import {
  AiOutlineInsertRowAbove,
  AiOutlineQuestion,
  AiOutlineRead,
  AiOutlineFieldTime,
  AiOutlineNotification,
  AiOutlineExport,
  AiOutlineImport,
  AiOutlineHdd,
} from 'react-icons/ai';
import SideNavLink from './SideNavLink';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/slices/auth/auth-action-creators';

const SideNav = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const logout = (
    <button className={classes.logout} onClick={() => dispatch(logoutUser())}>
      Log Out
      <i className={classes['logout-icon']}>
        <AiOutlineImport />
      </i>
    </button>
  );

  const login = (
    <SideNavLink icon={<AiOutlineExport />} to="/auth/login">
      Login
    </SideNavLink>
  );
  const footerAuthLink = auth.isAuthenticated ? logout : login;

  return (
    <div className={classes['side-nav']}>
      <div>
        <div className={classes['side-nav__header']}>
          <Link to="/">
            <p className={classes['side-nav__logo']}>Edutain</p>
          </Link>
        </div>
        <ul className={classes['side-nav__links']}>
          <SideNavLink icon={<AiOutlineHdd />} to="/library">
            Library
          </SideNavLink>
          <SideNavLink icon={<AiOutlineNotification />} to="/news">
            News
          </SideNavLink>
          <SideNavLink icon={<AiOutlineRead />} to="/handouts">
            Handouts
          </SideNavLink>
          <SideNavLink icon={<AiOutlineQuestion />} to="/assignments">
            Assignments
          </SideNavLink>
          <SideNavLink icon={<AiOutlineInsertRowAbove />} to="/timetables">
            Timetables
          </SideNavLink>
          <SideNavLink icon={<AiOutlineFieldTime />} to="/events">
            Events
          </SideNavLink>
        </ul>
      </div>
      <div className={classes['side-nav__footer']}>{footerAuthLink}</div>
    </div>
  );
};

export default SideNav;
