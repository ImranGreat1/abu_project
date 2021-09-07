import classes from './CardLink.module.css';

const CardLink = props => {
  return (
    <a href={props.href} className={classes.button}>
      <p className={classes.text}>{props.text}</p>
      <i className={classes.icon}>{props.icon}</i>
    </a>
  );
} 

export default CardLink;