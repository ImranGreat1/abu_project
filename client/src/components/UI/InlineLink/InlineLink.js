import { Link } from 'react-router-dom';
import classes from './InlineLink.module.css';

const InlineLink = (props) => {
  return (
    <Link to={props.to} className={classes['inline-link__link']}>
      {props.children}
      <span className={classes['inline-link__arrow']}>&rarr;</span>
    </Link>
  );
};

export default InlineLink;
