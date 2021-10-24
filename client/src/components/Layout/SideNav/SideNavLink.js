import classes from './SideNav.module.css';
import { NavLink } from 'react-router-dom';

const SideNavLink = (props) => {
  return (
    <li className={classes['side-nav__link-item']}>
      <NavLink
        to={props.to}
        className={classes['side-nav__link']}
        activeClassName={classes['side-nav__link--active']}
      >
        <i className={classes.icon}>{props.icon}</i>
        {props.children}
      </NavLink>
    </li>
  );
};

export default SideNavLink;
