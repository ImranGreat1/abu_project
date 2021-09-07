import classes from './IconWithText.module.css';
import { BsCalendar } from 'react-icons/bs';

const IconWithText = props => {
  return (
    <p className={classes['icon-with-text']}>
      <i className={classes['icon-with-text__icon']}>{props.icon}</i>
      <span className={classes['icon-with-text__text']}>{props.text}</span>
    </p>
  );
}

export default IconWithText;