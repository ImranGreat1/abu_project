import classes from './Aside.module.css';
import { FaBook } from 'react-icons/fa';
import { BsPen, BsNewspaper, BsWatch, BsFillPuzzleFill, BsCalendar, BsBoxArrowRight } from 'react-icons/bs'
import AsideLink from './AsideLink';


const Aside = () => {
  return (
    <aside className={classes.aside}>
      <main>
        <header className={classes.aside__header}>
          <p className={classes.aside__logo}>Edutain</p>
        </header>
        <ul className={classes.aside__links}>
          <AsideLink icon={<BsNewspaper/>} href="#">News</AsideLink>
          <AsideLink icon={<FaBook/>} href="#">Handouts</AsideLink>
          <AsideLink icon={<BsFillPuzzleFill/>} href="#">Assignments</AsideLink>
          <AsideLink icon={<BsCalendar/>} href="#">Timetables</AsideLink>
          <AsideLink icon={<BsWatch/>} href="#">Events</AsideLink>
        </ul>
      </main>
      <footer className={classes.aside__footer}>
        <a href="#" className={classes.logout}>
          Log Out
          <i className={classes['logout-icon']}><BsBoxArrowRight/></i>
        </a>
      </footer>
    </aside>
  );
}

export default Aside;