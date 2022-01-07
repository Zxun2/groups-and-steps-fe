import { Typography, Paper } from "@material-ui/core";
import { loginStyles } from "../../styles/Style";
import { Fragment } from "react";
import LoginInputs from "./LoginInputs";
import LoginButtons from "./LoginButtons";

interface LoginFormProps {
  handleSubmit: any; // TODO: HANDLE THIS!
  loading: boolean;
  form: any;
  isRegistering: boolean;
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}

// Form Component
const LoginForm: React.FC<LoginFormProps> = (props) => {
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

        <LoginInputs form={props.form} isRegistering={props.isRegistering} />

        <LoginButtons
          isRegistering={props.isRegistering}
          form={props.form}
          loading={props.loading}
          setIsRegistering={props.setIsRegistering}
        />
      </Paper>
    </Fragment>
  );
};

export default LoginForm;
