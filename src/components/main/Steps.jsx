import { drawerWidth } from "../../actions/constants";
import AppIcon from "../svgs/AppIcon";
import { Toolbar, Box } from "@mui/material";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    height: "88vh",
    background: theme.palette.background.tertiary,
    borderRadius: "10px",
  },
}));

const Steps = (props) => {
  const classes = useStyles();
  const Steps = useSelector((state) => state.step.steps);
  const status = useSelector((state) => state.ui.globalState);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        backgroundColor: "#2f3136",
        height: "100vh",
      }}
    >
      {(props.title === "" || props.Todos.length === 0) && (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            color="secondary"
            style={{ fontWeight: "600", display: "inline" }}
          >
            Welcome{" "}
            <span style={{ color: "#5865f2" }}>
              {props.userState?.currUser?.name}
            </span>
            ,
          </Typography>

          <Typography
            variant="h4"
            color="secondary"
            style={{ fontWeight: "600" }}
          >
            Create/Select a group to get started!
          </Typography>
          <AppIcon />
        </Box>
      )}
      {props.title !== "" && (
        <Fragment>
          <Toolbar />
          <Box className={classes.main}>
            {status === "loading" && <LinearProgress color="primary" />}
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default Steps;
