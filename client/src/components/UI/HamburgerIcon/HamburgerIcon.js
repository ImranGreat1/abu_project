import classes from './HamburgerIcon.module.css';
import { useState, useContext } from 'react';
import hamburgerContext from '../../Layout/MainLayout/store';

const HamburgerIcon = () => {
  const hamburgerCtx = useContext(hamburgerContext);
  const isOpen = hamburgerCtx.isOpen;

  const inputChangeHandler = () => {
    hamburgerCtx.hamburgerChangeHandler();
  };

  return (
    <div className={classes.hamburger}>
      <div
        className={`${classes.hamburger__lines} ${isOpen && classes.open}`}
      ></div>
      <input
        type="checkbox"
        onChange={inputChangeHandler}
        className={classes.hamburger__checkbox}
      />
    </div>
  );
};

export default HamburgerIcon;
