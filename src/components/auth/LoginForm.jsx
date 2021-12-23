import { Typography, Button, CircularProgress, Paper } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import { Fragment } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box } from "@material-ui/core";
import { loginStyles } from "../ui/Style";

const LoginForm = (props) => {
  const classes = loginStyles();

  return (
    <Fragment>
      <Paper
        elevation={10}
        component="form"
        onSubmit={props.handleSubmit}
        className={classes.login__form}
      >
        <Typography variant="h1" className={classes.linearWipe}>
          Groups and Steps - A knowledge repository 📝
        </Typography>
        {props.isRegistering && (
          <Fragment>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Type your name"
              value={props.form.enteredName}
              onChange={props.form.nameInputChangeHandler}
              onBlur={props.form.nameInputBlurHandler}
              required
            />
            {props.form.nameInputHasError && (
              <p className={classes.error_text}>
                Name must have more than 5 characters!
              </p>
            )}
          </Fragment>
        )}
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Type your email"
          value={props.form.enteredEmail}
          onChange={props.form.EmailInputChangeHandler}
          onBlur={props.form.EmailInputBlurHandler}
          required
        />
        {props.form.emailInputHasError && (
          <p className={classes.error_text}>Email format is wrong!</p>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Type your password"
          value={props.form.enteredPassword}
          onChange={props.form.passwordInputChangeHandler}
          onBlur={props.form.passwordInputBlurHandler}
          required
        />
        {props.form.passwordInputHasError && (
          <p className={classes.error_text}>
            Password must be more than 6 characters!
          </p>
        )}
        {props.isRegistering && (
          <Fragment>
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              placeholder="Type your password"
              value={props.form.enteredPasswordConfirmation}
              onChange={props.form.passwordConfirmationInputChangeHandler}
              onBlur={props.form.passwordConfirmationInputBlurHandler}
              required
            />
            {props.form.passwordConfirmationInputHasError && (
              <p className={classes.error_text}>
                The password you entered is not the same!
              </p>
            )}
          </Fragment>
        )}

        <Box className={classes.btn__group}>
          {!props.isRegistering && (
            <Fragment>
              <Button
                className={classes.submit__btn}
                type="submit"
                size="large"
                variant="outlined"
                endIcon={!props.loading ? <SendIcon /> : <CircularProgress />}
                color="primary"
                disabled={!props.form.formIsValid}
              >
                Log in
              </Button>
              {!props.loading && (
                <Button
                  className={classes.submit__btn}
                  size="large"
                  variant="outlined"
                  onClick={() => props.setIsRegistering(true)}
                  color="primary"
                >
                  Register Here
                </Button>
              )}
            </Fragment>
          )}
          {props.isRegistering && (
            <Fragment>
              {!props.loading && (
                <Button
                  className={classes.submit__btn}
                  size="large"
                  variant="outlined"
                  startIcon={<ArrowBackIosNewIcon />}
                  onClick={() => props.setIsRegistering(false)}
                  color="primary"
                >
                  Back
                </Button>
              )}
              <Button
                className={classes.submit__btn}
                size="large"
                type="submit"
                endIcon={<SendIcon />}
                color="primary"
                variant="outlined"
                disabled={!props.form.formIsValid}
              >
                {!props.loading && "Register"}
                {props.loading && <CircularProgress />}
              </Button>
            </Fragment>
          )}
        </Box>
      </Paper>
    </Fragment>
  );
};

export default LoginForm;
