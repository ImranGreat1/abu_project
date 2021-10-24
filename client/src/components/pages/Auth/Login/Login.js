import { Fragment, useState } from 'react';
import classes from '../AuthPage.module.css';
import btnClasses from '../../../UI/Button/Button.module.css';
import { BsEnvelopeFill, BsFillLockFill } from 'react-icons/bs';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import useInput from '../../../../hooks/use-input';
import validator from 'validator';
import { authenticateUser } from '../../../../store/slices/auth/auth-action-creators';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../../../UI/Alert/Alert';
import useQuery from '../../../../hooks/use-query';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const message = useSelector((state) => state.message);
  const query = useQuery();
  const dispatch = useDispatch();

  // Email validation function
  const emailValidator = (value) => {
    let data = { valid: true, errorMsg: '' };
    if (validator.isEmpty(value)) {
      data.valid = false;
      data.errorMsg = 'Please provide your username';
    }

    return data;
  };

  // Password validation function
  const passwordValidator = (value) => {
    let data = { valid: true, errorMsg: '' };
    if (value.trim().length < 7) {
      data.valid = false;
      data.errorMsg = 'Password must not be less than 7 characters!';
    }

    return data;
  };

  let {
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    validateOnSubmit: validateEmailOnSubmit,
    errorMessage: emailErrorMessage,
    hasError: emailHasError,
    value: email,
    ref: emailRef,
  } = useInput(emailValidator);

  let {
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    validateOnSubmit: validatePasswordOnSubmit,
    hasError: passwordHasError,
    errorMessage: passwordErrorMessage,
    value: password,
    ref: passwordRef,
  } = useInput(passwordValidator);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // Validate Inputs on submit
    validatePasswordOnSubmit();
    validateEmailOnSubmit();

    // Return if any of the input(s) is empty
    if (validator.isEmpty(data.email) || validator.isEmpty(data.password)) {
      return;
    }

    // Return if any of the input(s) has error.
    if (emailHasError || passwordHasError) {
      return;
    }

    // Authenticate User
    dispatch(authenticateUser(data));
  };

  if (isAuthenticated) {
    const redirect = query.get('redirect') ? query.get('redirect') : '';

    return <Redirect to={`/${redirect}`} />;
  }

  const showMessage = message.message && message.forPage === 'login';

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.form__header}>
          <h1 className={classes['form__header-text']}>
            Login In to Your Edutain Account!
          </h1>
        </div>
        {showMessage && <Alert message={message} />}
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <div className={classes.form__group}>
            <Input
              id="username"
              label="Username"
              icon={<BsEnvelopeFill />}
              value={email}
              type="text"
              ref={emailRef}
              errorMessage={emailErrorMessage}
              changeHandler={emailChangeHandler}
              onBlur={emailBlurHandler}
              input={{ placeholder: 'Phone/Email' }}
            />
          </div>

          <div className={classes.form__group}>
            <Input
              id="password"
              label="Password"
              icon={<BsFillLockFill />}
              value={password}
              type="password"
              ref={passwordRef}
              errorMessage={passwordErrorMessage}
              changeHandler={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              input={{ placeholder: 'Password', autoComplete: 'on' }}
            />
          </div>
          <div className={classes.form__button}>
            <Button
              type="submit"
              className={`${btnClasses['btn']} ${btnClasses['btn--large']} ${btnClasses['btn--block']}`}
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Loading...' : 'Log In'}
            </Button>
          </div>
        </form>
        <p className={classes['form__refer-link']}>
          <span className={classes['form__refer-link-text']}>
            Don't have an account ?
          </span>
          <Link to="/auth/signup">Register</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Login;
