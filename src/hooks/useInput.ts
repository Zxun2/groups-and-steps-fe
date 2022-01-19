import { useState } from "react";

interface Validation {
  (value: string): boolean | RegExpMatchArray | null;
}

// Custom Hook for Form Validation
const useInput = (validateValue: Validation) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // Validate
  const valueIsValid = validateValue(enteredValue);
  // Input was touched but value is invalid
  const hasError = !valueIsValid && isTouched;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const InputBlurHandler = (e: React.FormEvent<HTMLInputElement>) => {
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
