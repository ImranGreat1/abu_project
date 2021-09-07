import React from 'react';
import classes from './Home.module.css';
import Feeds from '../../UI/Feeds/Feeds';
import Aside from './Aside/Aside'
import Main from './Main/Main';
import ReactDOM from 'react-dom';
import FeedDetails from '../../UI/Feeds/FeedDetails/FeedDetails';

const Home = () => {
  return (
    <div className={classes.home}>
      { ReactDOM.createPortal(<Aside />, document.getElementById('side-navigation')) }
      <div className={classes['aside-back']}></div>
      <Main />  
      {/* <FeedDetails /> */}
    </div>
  );
}

export default Home;


{/* <div className={clasess.category}>
<ul className={clasess.category__list}>
  <li className={clasess['category__list-item']}>
    <a className={`${clasess.category__link}`} href="#">All</a>
  </li>
  <li className={clasess['category__list-item']}>
    <a className={`${clasess.category__link} ${clasess.current}`} href="#">Departmental</a>
  </li>
  <li className={clasess['category__list-item']}>
    <a className={clasess.category__link} href="#">Faculty-Wide</a>
  </li>
  <li className={clasess['category__list-item']}>
    <a className={clasess.category__link} href="#">School-wide</a>
  </li>
</ul>
</div> */}