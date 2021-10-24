import { useState } from 'react';

const useInput = (validateInput) => {
  const [inputValue, setInputValue] = useState('');
  const [inputTouched, setInputTouched] = useState(false);

  const isValidValue = validateInput(inputValue);
  const hasError = !isValidValue && inputTouched;

  const inputChangeHandler = event => {
    setInputValue(event.target.value);
  }

  const inputBlurHandler = event => {
    setInputTouched(true);
  }

  const resetInput = () => {
    setInputValue('');
    setInputTouched(false);
  }

  return {
    value: inputValue,
    isValidValue,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    resetInput
  }

}

export default useInput;