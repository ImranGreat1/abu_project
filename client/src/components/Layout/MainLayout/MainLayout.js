import classes from './MainLayout.module.css';
import ReactDOM from 'react-dom';
import HamburgerIcon from '../../UI/HamburgerIcon/HamburgerIcon';
import hamburgerContext from './store';
import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav/SideNav';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const hamburgerChangeHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <hamburgerContext.Provider value={{ isOpen, hamburgerChangeHandler }}>
      <div className={classes.wrapper}>
        {ReactDOM.createPortal(
          <div className={classes.hamburger}>
            <HamburgerIcon
              closeSideDrawer={() => setIsOpen(false)}
              isOpen={isOpen}
            />
          </div>,
          document.getElementById('side-navigation')
        )}
        {ReactDOM.createPortal(
          <div
            className={`${classes['side-drawer']} ${isOpen && classes.show}`}
          >
            <SideNav />
          </div>,
          document.getElementById('side-navigation')
        )}

        {ReactDOM.createPortal(
          <div className={classes['aside__top']}>
            <SideNav />
          </div>,
          document.getElementById('side-navigation')
        )}

        {/* {ReactDOM.createPortal(
          <div className={`${classes['aside-wrapper']}`}>
            <SideNav />
          </div>,
          document.getElementById('side-navigation')
        )} */}

        {/* <div>
        <div className={classes["side-drawer"]}></div>
        <div className={classes.hamburger}>Hamburger</div>
      </div> */}
        <div className={classes.aside}></div>
        <main className={classes.main}>
          <Main />
          <Footer />
        </main>
      </div>
    </hamburgerContext.Provider>
  );
};

export default MainLayout;
