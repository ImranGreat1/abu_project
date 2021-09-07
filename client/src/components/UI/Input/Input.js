import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {

  const inputRef = useRef();

  const focusInput = () => inputRef.current.focus(); 

  useImperativeHandle(ref, () => {
    return { focus: focusInput, value: inputRef.current.value }
  })

  return (
    <div className={classes.form__group}>
      <label htmlFor={props.id} className={classes.form__label}>{props.label}</label>
      
      <input 
        ref={inputRef}
        className={`
            ${classes.form__input} 
            ${props.invalid && classes.invalid}
            ${props.showErrorMessage && classes['detail-error']}
            ${props.className}
          `}
        {...props.input}
      />
      { props.input.type === 'password' && <span className={classes['forget-password']}><a href="#">Forgot your password?</a></span> }
      {props.showErrorMessage && <p className={classes.form__error}>{props.errorMessage}</p>}
      {
        props.input.type === 'password' && !props.showErrorMessage && props.formType === 'signup'
        && <p className={classes['password-length']}>Password must be atleast 8 characters!</p>}
    </div>
  );
});

export default Input;