import React, { Fragment } from 'react';
import classes from './Header.module.css';

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h4 className={classes.header__logo}>
                    <a href='#'>EDUTAIN</a>
                </h4>
                <nav className={classes.header__nav}>
                    <ul className={classes.header__links}>
                        <li className={classes['header__link-item']}>
                            <a href='#' className={classes.header__link}>Handouts</a>
                        </li>
                        <li className={classes['header__link-item']}>
                            <a href='#' className={classes.header__link}>Departmentals</a>
                        </li>
                        <li className={classes['header__link-item']}>
                            <a href='#' className={classes.header__link}>Assignments</a>
                        </li>
                        { props.isLoggedIn &&
                            <li className={classes['header__link-item']}>
                                <a href='#' className={classes.header__link} onClick={() => props.logout()}>Logout</a>
                            </li>
                        }
                    </ul> 
                </nav>
                {/* <img className={classes['header__user-avatar']} src='abulogo.png' /> */}
            </header>
        </Fragment>
    )
};

export default Header;