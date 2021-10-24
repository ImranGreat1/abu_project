import classes from './Home.module.css';
import HomePosts from './HomePosts';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Alert from '../../UI/Alert/Alert';

const Home = () => {
  const message = useSelector((state) => state.message);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={classes.home}>
      {message.message && isOpen && message.forPage === 'home' && (
        <Alert message={message} closeAlert={() => setIsOpen(false)} />
      )}
      <header className={classes.home__header}></header>
      <section className={classes['home__post-section']}>
        <HomePosts />
      </section>
    </div>
  );
};

export default Home;
