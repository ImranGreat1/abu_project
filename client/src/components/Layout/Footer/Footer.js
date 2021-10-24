import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p className={classes.footer__text}>
        &copy; 2021 Edutain. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
