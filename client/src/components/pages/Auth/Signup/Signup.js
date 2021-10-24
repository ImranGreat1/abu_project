import { Fragment } from 'react';
import classes from '../AuthPage.module.css';
import btnClasses from '../../../UI/Button/Button.module.css';
import {
  BsEnvelopeFill,
  BsFillPersonFill,
  BsFillLockFill,
} from 'react-icons/bs';

import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import useInput from '../../../../hooks/use-input';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../../store/slices/auth/auth-action-creators';
import { useHistory, Link } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isAuthenticated) history.push('/');

  const nameValidator = (value) => {
    let data = { valid: true, errorMsg: '' };
    if (validator.isEmpty(value)) {
      data.valid = false;
      data.errorMsg = 'Name cannot be blank!';
    }

    return data;
  };

  const emailValidator = (value) => {
    let data = { valid: true, errorMsg: '' };
    if (!validator.isEmail(value) && !validator.isMobilePhone(value)) {
      data.valid = false;
      data.errorMsg = 'Please provide a valid phone number or email';
    }

    return data;
  };

  const passwordValidator = (value) => {
    let data = { valid: true, errorMsg: '' };
    if (value.trim().length < 7) {
      data.valid = false;
      data.errorMsg = 'Password must not be less than 7 characters!';
    }

    return data;
  };

  const {
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    validateOnSubmit: validateNameOnSubmit,
    errorMessage: nameErrorMessage,
    hasError: nameHasError,
    value: name,
    ref: nameRef,
  } = useInput(nameValidator);

  const {
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    validateOnSubmit: validateEmailOnSubmit,
    errorMessage: emailErrorMessage,
    hasError: emailHasError,
    value: email,
    ref: emailRef,
  } = useInput(emailValidator);

  const {
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    validateOnSubmit: validatePasswordOnSubmit,
    errorMessage: passwordErrorMessage,
    hasError: passwordHasError,
    value: password,
    ref: passwordRef,
  } = useInput(passwordValidator);

  const {
    changeHandler: passwordConfirmChangeHandler,
    blurHandler: passwordConfirmBlurHandler,
    validateOnSubmit: validatePasswordConfirmOnSubmit,
    passwordMatchPasswordConfirm,
    errorMessage: passwordConfirmErrorMessage,
    hasError: passwordConfirmHasError,
    value: passwordConfirm,
    ref: passwordConfirmRef,
  } = useInput(passwordValidator);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    validateNameOnSubmit();
    validateEmailOnSubmit();
    validatePasswordOnSubmit();
    validatePasswordConfirmOnSubmit();

    if (
      nameHasError ||
      emailHasError ||
      passwordHasError ||
      passwordConfirmHasError
    ) {
      return;
    }

    if (
      validator.isEmpty(name) ||
      validator.isEmpty(email) ||
      validator.isEmpty(password) ||
      validator.isEmpty(passwordConfirm)
    ) {
      return;
    }

    if (!passwordHasError && password !== passwordConfirm) {
      passwordMatchPasswordConfirm(password);
      return;
    }

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value,
    };

    // Register user
    dispatch(registerUser(data));
  };

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.form__header}>
          <h1 className={classes['form__header-text']}>
            Learning Make Easier. Join now!
          </h1>
        </div>
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <div className={classes.form__group}>
            <Input
              id="name"
              label="Name"
              icon={<BsFillPersonFill />}
              value={name}
              ref={nameRef}
              type="text"
              errorMessage={nameErrorMessage}
              changeHandler={nameChangeHandler}
              onBlur={nameBlurHandler}
              input={{ placeholder: 'Enter your name' }}
            />
          </div>

          <div className={classes.form__group}>
            <Input
              id="username"
              label="Phone/Email"
              icon={<BsEnvelopeFill />}
              value={email}
              type="text"
              ref={emailRef}
              errorMessage={emailErrorMessage}
              changeHandler={emailChangeHandler}
              onBlur={emailBlurHandler}
              input={{ placeholder: 'Phone Number or Email' }}
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
              input={{ placeholder: '6+ strong characters' }}
            />
          </div>

          <div className={classes.form__group}>
            <Input
              id="confirm password"
              label="Confirm Password"
              icon={<BsFillLockFill />}
              value={passwordConfirm}
              type="password"
              ref={passwordConfirmRef}
              errorMessage={passwordConfirmErrorMessage}
              changeHandler={passwordConfirmChangeHandler}
              onBlur={passwordConfirmBlurHandler}
              input={{ placeholder: 'Confirm Password' }}
            />
          </div>

          <div className={classes.form__button}>
            <Button
              type="submit"
              className={`${btnClasses['btn']} ${btnClasses['btn--large']} ${btnClasses['btn--block']}`}
              disabled={isLoading ? true : false}
            >
              {isLoading ? '...Loading' : 'Sign Up'}
            </Button>
          </div>
        </form>
        <p className={classes['form__refer-link']}>
          <span className={classes['form__refer-link-text']}>
            Have an account?
          </span>
          <Link to="/auth/login">Login</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Signup;
