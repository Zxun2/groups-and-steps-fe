import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../store/user-slice";
import { useHistory } from "react-router-dom";
import { Box, makeStyles, LinearProgress } from "@material-ui/core";
import { LoggingIn, Register } from "../lib/api";
import LoginForm from "./LoginForm";
import useInput from "../hooks/useInput";
import LandingIcon from "../svgs/LandingPage";
import { uiAction } from "../store/ui-slice";
import { SUCCESS } from "../../actions/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.tertiary,
    height: "100vh",
  },
  login: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
  svg: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const {
    value: enteredPassword,
    valid: enteredPasswordIsValid,
    error: passwordInputHasError,
    inputChangeHandler: passwordInputChangeHandler,
    InputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "" && value.length > 5);

  const {
    value: enteredPasswordConfirmation,
    valid: enteredPasswordConfirmationIsValid,
    error: passwordConfirmationInputHasError,
    inputChangeHandler: passwordConfirmationInputChangeHandler,
    InputBlurHandler: passwordConfirmationInputBlurHandler,
    reset: resetPasswordConfirmationInput,
  } = useInput((value) => value.trim() === enteredPassword);

  const {
    value: enteredName,
    valid: enteredNameIsValid,
    error: nameInputHasError,
    inputChangeHandler: nameInputChangeHandler,
    InputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "" && value.length > 5);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const LoggedIn = async () => {
      setIsLoading(true);
      try {
        let responseData;
        if (!isRegistering) {
          responseData = await LoggingIn(enteredEmail, enteredPassword);
        } else {
          responseData = await Register(
            enteredName,
            enteredEmail,
            enteredPassword,
            enteredPasswordConfirmation
          );
        }
        const { user, token, ...message } = responseData;

        localStorage.setItem("token", token);

        dispatch(
          userAction.logUserIn({
            user,
            token,
          })
        );

        dispatch(
          uiAction.showNotification({
            status: SUCCESS,
            title: "Success",
            message: message.message
              ? message.message
              : "Logged in successfully",
          })
        );

        setIsLoading(false);
        history.push("/dashboard");
      } catch (err) {
        setIsLoading(false);
        dispatch(
          uiAction.showNotification({
            status: "error",
            title: "Error!",
            message:
              "Something went wrong! Please double check your credentials. ",
          })
        );
      }
    };
    LoggedIn();

    resetPasswordInput();
    resetEmailInput();
  };

  return (
    <React.Fragment>
      {loading && <LinearProgress />}
      <Box className={`${classes.root} ${classes.login}`}>
        <LoginForm
          handleSubmit={handleSubmit}
          loading={loading}
          form={formValidation}
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
        />
        <Box style={{ margin: "5rem" }} className={classes.svg}>
          <LandingIcon />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Login;
