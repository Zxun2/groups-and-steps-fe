import { useState } from "react";

// Custom Hook for Form Validation
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // Validate
  const valueIsValid = validateValue(enteredValue);
  // Input was touched but value is invalid
  const hasError = !valueIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const InputBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    valid: valueIsValid,
    error: hasError,
    inputChangeHandler,
    InputBlurHandler,
    reset,
  };
};

export default useInput;
