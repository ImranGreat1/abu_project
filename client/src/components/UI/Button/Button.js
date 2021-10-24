import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      disabled={props.isDisabled}
      type={props.type ? props.type : 'button'}
      className={`${classes.btn} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
