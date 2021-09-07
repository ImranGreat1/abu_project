import React from 'react';
import classes from './HamburgerMenu.module.css';
// import 'overlayscrollbars/css/OverlayScrollbars.css';
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';


const HamburgerMenu = props => {
  return (
    <React.Fragment>
      <div className={classes.hamburger}>
          <div className={classes.hamburger__lines}></div>
          <input type="checkbox" onChange={() => console.log('Changed!!!')} className={classes.hamburger__checkbox} />
      </div>
        <nav className={classes.nav}>
          <button className={classes['nav__close-btn']}></button>
          <div className={classes.nav__logo}>EDUTAIN</div>
          <ul className={classes.nav__list}>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Home</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>About</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Contact Us</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Logout</a>
            </li>

            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Home</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>About</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Contact Us</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Logout</a>
            </li>

            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Home</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>About</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Contact Us</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Logout</a>
            </li>

            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Home</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>About</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Contact Us</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Logout</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Home</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>About</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Contact Us</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Logout</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Home</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>About</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Contact Us</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Logout</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Home</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>About</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Contact Us</a>
            </li>
            <li className={classes['nav__list-item']}>
              <a href="#" className={classes.nav__link}>Logout</a>
            </li>
          </ul>
        </nav>
    </React.Fragment>
  );
}

export default HamburgerMenu;
