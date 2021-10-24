import { useState } from 'react';
import classes from './FormValidation.module.css';
import useInput from './use-input';

const FormValidation = () => {

  const validateName = value => value.trim() !== '';
  const { 
    value: name, 
    isValidValue: isValidName,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetInput: resetName
  } = useInput(validateName);

  const validateEmail = value => value.includes('@');
  const { 
    value: email, 
    isValidValue: isValidEmail,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: resetEmail
  } = useInput(validateEmail);

  const formSubmitHandler = event => {
    event.preventDefault();
    
    if (!isValidName || !isValidEmail) return;
    console.log(name);
    // Reset form
    resetName()
    resetEmail()
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes['form-group']}>
        <input 
          type="text" 
          value={name} 
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
      { nameHasError && <p className={classes.error}>Please provide a name</p> }
      </div>
      
      <div className={classes['form-group']}>
        <input 
          type="email" 
          value={email} 
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        { emailHasError && <p className={classes.error}>Please provide a valid email</p> }
      </div>

      <div>
        <button className={classes.btn} disabled={!isValidName}>Submit</button>
      </div>
    </form>
  );
}

export default FormValidation;