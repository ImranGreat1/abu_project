import classes from './Main.module.css';
import Feeds from '../../../UI/Feeds/Feeds';

const Main = () => {
  return (
    <div className={classes.main}>
      <header className={classes.main__header}>

      </header>
      <main className={classes["main__feed-section"]}>
        <Feeds />
      </main>
    </div>
  );
}

export default Main;