import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../store/user-slice";
import { useHistory } from "react-router-dom";
import {
  Box,
  makeStyles,
  Typography,
  Button,
  ButtonGroup,
  CircularProgress,
  LinearProgress,
  Paper,
} from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import { LoggingIn } from "../lib/api";

const initialState = {
  email: "",
  password: "",
  registrationErrors: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.primary,
    height: "100vh",
  },
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
    width: "50%",
    backgroundColor: theme.palette.background.primary,
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
}));

const Login = (props) => {
  const classes = useStyles();
  const [formState, setFormState] = useState(initialState);
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formState;

    const LoggedIn = async () => {
      setIsLoading(true);
      try {
        const responseData = await LoggingIn(email, password);
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

    formState.email = "";
    formState.password = "";
  };

  const valueChangeHandler = (e) => {
    setFormState((prevState) => {
      const value = e.target.value;
      return {
        ...prevState,
        [e.target.name]: value,
      };
    });
  };

  return (
    <React.Fragment>
      {loading && <LinearProgress />}
      <Box className={`${classes.root} ${classes.login}`}>
        <Paper
          elevation={10}
          component="form"
          onSubmit={handleSubmit}
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
            value={formState.email}
            onChange={valueChangeHandler}
            required
          ></input>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Type your password"
            value={formState.password}
            onChange={valueChangeHandler}
            required
          ></input>

          <ButtonGroup variant="outlined" className={classes.btn__group}>
            <Button
              className={classes.submit__btn}
              type="submit"
              size="large"
              endIcon={!loading ? <SendIcon /> : null}
              color="primary"
            >
              {!loading && "Log in"}
              {loading && <CircularProgress />}
            </Button>
            <Button
              className={classes.submit__btn}
              type="submit"
              size="large"
              endIcon={<SendIcon />}
              color="primary"
            >
              Register here
            </Button>
          </ButtonGroup>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default Login;
