import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../store/user-slice";
import { useHistory } from "react-router-dom";
import { Box, makeStyles, LinearProgress } from "@material-ui/core";
import { LoggingIn } from "../lib/api";
import LoginForm from "./LoginForm";
import useInput from "../hooks/useInput";
import LandingIcon from "../svgs/LandingPage";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: "linear-gradient(#2c2f33,  #23272A)",
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
}));

const Login = (props) => {
  const classes = useStyles();
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    value: enteredPassword,
    valid: enteredPasswordIsValid,
    error: passwordInputHasError,
    inputChangeHandler: passwordInputChangeHandler,
    InputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "" && value.length > 5);

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

  useEffect(() => {
    if (enteredPasswordIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredPasswordIsValid, enteredEmailIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!enteredPasswordIsValid || !enteredEmailIsValid) {
      return;
    }

    const LoggedIn = async () => {
      setIsLoading(true);
      try {
        const responseData = await LoggingIn(enteredEmail, enteredPassword);
        const { user, token } = responseData;

        localStorage.setItem("token", token);

        dispatch(
          userAction.logUserIn({
            user,
            token,
          })
        );

        history.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    LoggedIn();

    resetPasswordInput();
    resetEmailInput();
  };

  return (
    <React.Fragment>
      {loading && <LinearProgress />}
      <Box className={`${classes.root} ${classes.login}`}>
        <Box style={{ margin: "0 5rem 0 5rem" }}>
          <LandingIcon />
        </Box>
        <LoginForm
          handleSubmit={handleSubmit}
          loading={loading}
          enteredEmail={enteredEmail}
          enteredPassword={enteredPassword}
          passwordInputChangeHandler={passwordInputChangeHandler}
          EmailInputChangeHandler={EmailInputChangeHandler}
          passwordInputBlurHandler={passwordInputBlurHandler}
          EmailInputBlurHandler={EmailInputBlurHandler}
          emailInputHasError={emailInputHasError}
          passwordInputHasError={passwordInputHasError}
          formIsValid={formIsValid}
        />
      </Box>
    </React.Fragment>
  );
};

export default Login;
