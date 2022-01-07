import { loginStyles } from "../../styles/Style";
import React, { Fragment } from "react";

interface LoginInputsProps {
  form: any;
  isRegistering: boolean;
}

const LoginInputs: React.FC<LoginInputsProps> = (props) => {
  const classes = loginStyles();
  return (
    <>
      {/* Name */}
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

      {/* Email */}
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

      {/* Password */}
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

      {/* Password Confirmation */}
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
    </>
  );
};

export default LoginInputs;
