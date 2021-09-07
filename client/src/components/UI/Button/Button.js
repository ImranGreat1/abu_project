import React from 'react';
import classes from './Button.module.css';


const Button = props => {
  return (
    <div className={classes.form__group}>
        <button 
          disabled={props.disabled ? true : false}
          type={props.type ? props.type : 'button' } 
          className={`${classes.btn} ${classes[props.className]}`} 
        >
          {props.children}
        </button>
    </div>
  )
}

export default Button;