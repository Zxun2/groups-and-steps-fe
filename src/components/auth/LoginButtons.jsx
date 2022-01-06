import { Button, CircularProgress } from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SendIcon from "@mui/icons-material/Send";
import { loginStyles } from "../../styles/Style";
import { Box } from "@material-ui/core";
import { Fragment } from "react";

const LoginButtons = (props) => {
  const classes = loginStyles();
  return (
    <>
      <Box className={classes.btn__group}>
        {!props.isRegistering && (
          <Fragment>
            <Button
              className={classes.submit__btn}
              type="submit"
              size="large"
              variant="outlined"
              endIcon={!props.loading ? <SendIcon /> : ""}
              color="primary"
              disabled={!props.form.formIsValid}
            >
              {!props.loading && "Login"}
              {props.loading && <CircularProgress />}
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
    </>
  );
};

export default LoginButtons;
