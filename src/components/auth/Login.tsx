import React, { useState, useEffect, Fragment } from "react";
import {
  getLoadingStatus,
  RegisterUser,
  UserData,
  userLoggedIn,
} from "../../store/user-slice";
import { Box, LinearProgress } from "@material-ui/core";
import { ACTION } from "../../misc/constants";
import { uiAction } from "../../store/ui-slice";
import { useHistory } from "react-router-dom";
import LandingIcon from "../svgs/LandingPage";
import useInput from "../../hooks/useInput";
import { homeStyles } from "../../styles/Style";
import LoginForm from "./LoginForm";
import { useAppDispatch, useAppSelector } from "../../hooks/useHooks";

export interface UserDetail {
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface ResponseObject {
  meta: any;
  payload: UserData;
  type: string;
  error?: {
    name: string;
    stack: string;
    message: string;
  };
}

// Component responsible for Form Validation and Login/Registration State
const Login = () => {
  const classes = homeStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const loadingStatus = useAppSelector(getLoadingStatus);

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

  // TODO: DOUBLE CHECK THIS!
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const LoggedIn = async () => {
      try {
        let responseData;

        const payload: UserDetail = {
          email: enteredEmail,
          password: enteredPassword,
        };

        if (isRegistering) {
          payload.name = enteredName;
          payload.password_confirmation = enteredPasswordConfirmation;
        }

        let args = isRegistering
          ? RegisterUser(payload)
          : userLoggedIn(payload);

        responseData = (await dispatch(args)) as ResponseObject;

        console.log(responseData, "HELLLOOOO ");

        if (responseData.error) {
          throw new Error(responseData.error.message);
        }

        const { user, token, ...message } = responseData.payload;

        localStorage.setItem("token", token);

        dispatch(
          uiAction.showNotification({
            status: ACTION.SUCCESS,
            _title: "Success",
            message: message.message
              ? message.message
              : "Logged in successfully",
          })
        );

        history.push("/dashboard");
      } catch (err: any) {
        dispatch(
          uiAction.showNotification({
            status: ACTION.FAIL,
            _title: "Error!",
            message:
              err.message || "Something went wrong! Please try again later.",
          })
        );
      }
    };

    LoggedIn();

    resetPasswordInput();
    resetEmailInput();
    if (isRegistering) {
      resetNameInput();
      resetPasswordConfirmationInput();
    }
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
