import { useState, useRef } from 'react';
import validator from 'validator';

const defaultIsValid = (val) => ({ valid: true, errorMsg: '' });

const useInput = (isValid = defaultIsValid) => {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const ref = useRef();

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
    // Only validate on change when the input has an error before
    if (hasError) {
      const { valid, errorMsg } = isValid(value);

      if (value.trim().length !== 0 && !valid) {
        setHasError(true);
        setErrorMessage(errorMsg);
      } else {
        setHasError(false);
        setErrorMessage('');
      }
    }
    // setErrorMessage('');
    // setHasError(false);
  };

  const blurHandler = () => {
    // isValid function validate and return error message if any
    const { valid, errorMsg } = isValid(value);

    if (value.trim().length !== 0 && !valid) {
      setHasError(true);
      setErrorMessage(errorMsg);
    } else {
      setHasError(false);
      setErrorMessage('');
    }
  };

  const validateOnSubmit = () => {
    const { valid, errorMsg } = isValid(value);
    if (!valid) {
      setHasError(true);
      setErrorMessage(errorMsg);
    }
  };

  const passwordMatchPasswordConfirm = (password) => {
    if (password !== value) {
      setHasError(true);
      setErrorMessage('Password do not match!');
    }
  };

  return {
    changeHandler: inputChangeHandler,
    blurHandler,
    validateOnSubmit,
    passwordMatchPasswordConfirm,
    hasError,
    errorMessage,
    value,
    ref,
  };
};

export default useInput;
