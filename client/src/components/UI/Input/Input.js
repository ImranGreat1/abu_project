import React, { useRef, useImperativeHandle, Fragment } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const focusInput = () => inputRef.current.focus();

  useImperativeHandle(ref, () => {
    return { focus: focusInput, value: inputRef.current.value };
  });

  return (
    <Fragment>
      <label htmlFor={props.id} className={classes.input__label}>
        {props.label}
      </label>

      {props.icon && (
        <small className={classes.input__icon}>{props.icon}</small>
      )}

      <input
        ref={inputRef}
        className={`
            ${classes.input__input} 
            ${props.errorMessage && classes.invalid}
            ${props.icon && classes['more-padding']}
            ${props.className}
          `}
        onChange={props.changeHandler}
        onBlur={props.onBlur}
        type={props.type}
        id={props.id}
        {...props.input}
      />
      {props.errorMessage && (
        <p className={classes.input__error}>{props.errorMessage}</p>
      )}
    </Fragment>
  );
});

export default Input;
