import {
  makeStyles,
  Typography,
  Button,
  ButtonGroup,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";

const useStyles = makeStyles((theme) => ({
  login: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
  login__form: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    backgroundColor: theme.palette.background.secondary,
    padding: "2rem",

    "& > h1": {
      fontSize: "35px",
      marginBottom: "15px",
      paddingBottom: "10px",
      textAlign: "center",
      fontWeight: 600,
      color: theme.palette.primary.main,
    },

    "& > label ": {
      marginBottom: "1rem",
      fontSize: "1.5rem",
      fontWeight: "600",
      color: theme.palette.primary.main,
    },

    "& > input": {
      minWidth: "100px",
      padding: "20px 0",
      paddingLeft: "15px",
      marginBottom: "10px",
      outline: "none",
      border: "1px solid rgba(0, 0, 0, 0.24)",
      borderRadius: theme.shape.borderRadius,
      fontSize: "15px",
    },
  },
  linearWipe: {
    background:
      "linear-gradient(to right, #97A9B4 20%, #5865f2 40%, #5865f2 60%, #97A9B4 80%)",
    backgroundSize: "200% auto",
    backgroundClip: "text",
    textFillColor: "transparent",
    animation: "$shine 1s linear infinite",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  "@keyframes shine": {
    to: {
      backgroundPosition: "200% center",
    },
  },
  btn__group: {
    justifyContent: "end",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  submit__btn: {
    fontWeight: "500",
    "& :hover": {
      color: theme.palette.secondary.main,
    },
  },
  error_text: {
    color: theme.palette.error.main,
    margin: "0",
    fontWeight: "600",
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={10}
      component="form"
      onSubmit={props.handleSubmit}
      className={classes.login__form}
    >
      <Typography variant="h1" className={classes.linearWipe}>
        Your Weekly (Daily ?) To Do List 🚨
      </Typography>
      <label htmlFor="email">E-Mail Address</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Type your email"
        value={props.enteredEmail}
        onChange={props.EmailInputChangeHandler}
        onBlur={props.EmailInputBlurHandler}
        required
      />
      {props.emailInputHasError && (
        <p className={classes.error_text}>Email format is wrong!</p>
      )}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Type your password"
        value={props.enteredPassword}
        onChange={props.passwordInputChangeHandler}
        onBlur={props.passwordInputBlurHandler}
        required
      />
      {props.passwordInputHasError && (
        <p className={classes.error_text}>
          Password must be more than 6 characters!
        </p>
      )}

      <ButtonGroup variant="outlined" className={classes.btn__group}>
        <Button
          className={classes.submit__btn}
          type="submit"
          size="large"
          endIcon={!props.loading ? <SendIcon /> : null}
          color="primary"
          disabled={!props.formIsValid}
        >
          {!props.loading && "Log in"}
          {props.loading && <CircularProgress />}
        </Button>
        <Button
          className={classes.submit__btn}
          type="submit"
          size="large"
          endIcon={<SendIcon />}
          color="primary"
          disabled={!props.formIsValid}
        >
          {!props.loading && "Register Here"}
          {props.loading && <CircularProgress />}
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

export default LoginForm;
