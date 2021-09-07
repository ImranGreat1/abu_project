import { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import classes from './Signup.module.css'
import { reducer, INITIAL_STATE } from './reducer';
import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';




const Signup = props => {

  const [formState, dispatchForm] = useReducer(reducer, INITIAL_STATE);
  const { email, isValidEmail, password, isValidPassword, showEmailErrorMessage, showPasswordErrorMessage } = formState;

  // Input ref to focus on the first error input
  const emailRef = useRef();
  const passwordRef = useRef();

  // INPUTS CHANGE HANDLER
  const emailChangeHandler = event => {
    dispatchForm({ type: 'EMAIL_CHANGED', payload: event.target.value });
  }
  const passwordChangeHandler = event => {
    dispatchForm({ type: 'PASSWORD_CHANGED', payload: event.target.value });
  }

  // INPUT BLUR HANDLER
  const onBlurHandler = event => {
    if (event.target.name === 'email' && event.target.value.trim().length > 0)
    {
      dispatchForm({ type: 'EMAIL_BLURED' })
    }

    if (event.target.name === 'password' && event.target.value.trim().length > 0 )
    {
      dispatchForm({ type: 'PASSWORD_BLURED' })
    }
  }


  useEffect(() => {

    const inputValidationTimeout = setTimeout(() => {
      // If the use type anything, we try to validate on the fly after 4ms
      if (email.length ) {
        dispatchForm({ type: 'EMAIL_IS_VALID', payload: email })
      }
    }, 400);

    // Clear the interval before the next validation
    return () => clearTimeout(inputValidationTimeout);

  }, [email])


  useEffect(() => {

    const inputValidationTimeout = setTimeout(() => {
      // If the use type anything, we try to validate on the fly after 4ms
      if (password.length > 0) {
        dispatchForm({ type: 'PASSWORD_IS_VALID', payload: password })
      }
    }, 400);

    // Clear the interval before the next validation
    return () => clearTimeout(inputValidationTimeout);
  }, [password])
  
  // Form sSUBMIT HANDLER
  const formSubmitHandler = event => {
    event.preventDefault();
    if (!isValidEmail) 
    {
      // Send detail error messages if any
      dispatchForm({ type: 'ERROR_MESSAGE' });
      emailRef.current.focus();
      return;

    } else if (!isValidPassword)
    {
      // Send detail error messages if any
      dispatchForm({ type: 'ERROR_MESSAGE' });
      passwordRef.current.focus();
      return;
    }
    // console.log(email, password);
    alert('Signed up!')
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.wallpaper}></div>
      <div className={classes['form-container']}>
        <div className={classes.text}>
          <h1>Join us now</h1>
          <p>Learning make easier...</p>
        </div>
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <Input 
            input={{
              type: "text", 
              name: "email",
              id: "email", 
              value: email,
              onChange: emailChangeHandler,
              onBlur: onBlurHandler
            }}
            className=""
            invalid={isValidEmail === false && true }
            showErrorMessage={showEmailErrorMessage}
            errorMessage={showEmailErrorMessage && 'Invalid Email'}
            label="Email"
            ref={emailRef}
          />

          <Input 
            input={{
              type: "password",
              name: "password",
              id: "password",
              value: password,
              onChange: passwordChangeHandler,
              onBlur: onBlurHandler
            }}
            className=""
            label="Password"
            invalid={isValidPassword === false && true}
            showErrorMessage={showPasswordErrorMessage}
            errorMessage={showPasswordErrorMessage && 'Invalid Password'}
            formType='signup'
            ref={passwordRef}
          />

          <Button 
            // disabled={!isValidForm === true ? true: false} 
            type="submit" 
            className="btn--block"
          >
            Sign Up
          </Button>
        </form>
        <p className={classes.login}><a href="#">Have an account? Login</a></p>
      </div>
    </div>
  );
};

export default Signup;