import React, { useState, useEffect, Fragment } from "react";
import {
  getLoadingStatus,
  RegisterUser,
  userLoggedIn,
} from "../../store/user-slice";
import { Box, LinearProgress } from "@material-ui/core";
import { FAIL, SUCCESS } from "../../misc/constants";
import { uiAction } from "../../store/ui-slice";
import { useHistory } from "react-router-dom";
import LandingIcon from "../svgs/LandingPage";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { homeStyles } from "../../styles/Style";
import LoginForm from "./LoginForm";

// Component responsible for Form Validation and Login/Registration State
const Login = (props) => {
  const classes = homeStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const loadingStatus = useSelector(getLoadingStatus);

  const [formIsValid, setFormIsValid] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Validate Email
  const {
    value: enteredEmail,
    valid: enteredEmailIsValid,
    error: emailInputHasError,
    inputChangeHandler: EmailInputChangeHandler,
    InputBlurHandler: EmailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return value.match(mailFormat);
  });

  // Validate Name
  const {
    value: enteredName,
    valid: enteredNameIsValid,
    error: nameInputHasError,
    inputChangeHandler: nameInputChangeHandler,
    InputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "" && value.length > 5);

  // Validate Password
  const {
    value: enteredPassword,
    valid: enteredPasswordIsValid,
    error: passwordInputHasError,
    inputChangeHandler: passwordInputChangeHandler,
    InputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "" && value.length > 5);

  // Validate Password Confirmation
  const {
    value: enteredPasswordConfirmation,
    valid: enteredPasswordConfirmationIsValid,
    error: passwordConfirmationInputHasError,
    inputChangeHandler: passwordConfirmationInputChangeHandler,
    InputBlurHandler: passwordConfirmationInputBlurHandler,
    reset: resetPasswordConfirmationInput,
  } = useInput((value) => value.trim() === enteredPassword);

  // Props to pass
  const formValidation = {
    enteredEmail,
    emailInputHasError,
    EmailInputChangeHandler,
    EmailInputBlurHandler,
    resetEmailInput,
    enteredPassword,
    passwordInputHasError,
    passwordInputChangeHandler,
    passwordInputBlurHandler,
    resetPasswordInput,
    enteredName,
    nameInputHasError,
    nameInputChangeHandler,
    nameInputBlurHandler,
    resetNameInput,
    enteredPasswordConfirmation,
    passwordConfirmationInputHasError,
    passwordConfirmationInputChangeHandler,
    passwordConfirmationInputBlurHandler,
    resetPasswordConfirmationInput,
    formIsValid,
  };

  // Check form validation
  useEffect(() => {
    if (!isRegistering) {
      if (enteredPasswordIsValid && enteredEmailIsValid) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    } else {
      if (
        enteredPasswordIsValid &&
        enteredEmailIsValid &&
        enteredNameIsValid &&
        enteredPasswordConfirmationIsValid
      ) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    }
  }, [
    isRegistering,
    enteredPasswordIsValid,
    enteredEmailIsValid,
    enteredNameIsValid,
    enteredPasswordConfirmationIsValid,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const LoggedIn = async () => {
      try {
        let responseData;

        const payload = { email: enteredEmail, password: enteredPassword };

        if (isRegistering) {
          payload.name = enteredName;
          payload.password_confirmation = enteredPasswordConfirmation;
        }

        responseData = await dispatch(
          isRegistering ? RegisterUser(payload) : userLoggedIn(payload)
        );

        if (responseData.error) {
          throw new Error(responseData.payload.message);
        }

        const { user, token, ...message } = responseData.payload;

        localStorage.setItem("token", token);

        dispatch(
          uiAction.showNotification({
            status: SUCCESS,
            title: "Success",
            message: message.message
              ? message.message
              : "Logged in successfully",
          })
        );

        history.push("/dashboard");
      } catch (err) {
        dispatch(
          uiAction.showNotification({
            status: FAIL,
            title: "Error!",
            message:
              "Something went wrong! Please double check your credentials.",
          })
        );
      }
    };

    LoggedIn();

    resetPasswordInput();
    resetEmailInput();
  };

  return (
    <Fragment>
      {loadingStatus && <LinearProgress />}
      <Box className={`${classes.root} ${classes.login}`}>
        <LoginForm
          handleSubmit={handleSubmit}
          loading={loadingStatus}
          form={formValidation}
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
        />
        <Box style={{ margin: "5rem" }} className={classes.svg}>
          <LandingIcon />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Login;
