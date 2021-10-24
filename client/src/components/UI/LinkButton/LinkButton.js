import React from 'react';
import classes from './LinkButton.module.css';

const LinkButton = (props) => {
  return (
    <a
      href={props.href}
      className={`${classes.btn} ${classes[props.className]}`}
    >
      {props.children}
    </a>
  );
};

export default LinkButton;
