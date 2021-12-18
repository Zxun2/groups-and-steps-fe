import { drawerWidth } from "../../actions/constants";
import AppIcon from "../svgs/AppIcon";
import { Toolbar, Box, Stack } from "@mui/material";
import { Typography, Chip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { LinearProgress, TextField } from "@material-ui/core";
import AddTaskIcon from "../svgs/AddtasksIcon";
import CustomScrollbars from "../ui/CustomScollBars";
import { Divider } from "@mui/material";
import Task from "./Task";
import TagsInput from "./TagsInput";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    height: "88vh",
    background: theme.palette.background.tertiary,
    borderRadius: "10px",
    padding: "1rem",
  },
  notask: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Steps = (props) => {
  const classes = useStyles();
  const steps = useSelector((state) => state.step.steps);
  const status = useSelector((state) => state.ui.globalState);

  function handleSelectedTags(items) {
    console.log(items);
  }

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
          <Box
            className={`${classes.main} ${
              steps.length === 0 && classes.notask
            }`}
          >
            {status === "loading" && <LinearProgress color="primary" />}
            {steps.length === 0 && (
              <Fragment>
                <AddTaskIcon />
                <Typography
                  variant="subtitle2"
                  color="secondary"
                  style={{ fontWeight: "600" }}
                >
                  Create a task to get started!
                </Typography>
              </Fragment>
            )}
            {steps.length !== 0 && (
              <Fragment>
                <CustomScrollbars
                  style={{ height: "75vh" }}
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                >
                  <Stack spacing={3}>
                    {steps.map((step, index) => {
                      return (
                        <Task
                          key={step.id}
                          id={step.id}
                          step={step.step}
                          completed={step.completed}
                          todo_id={step.todo_id}
                          updated_at={step.updated_at}
                          tags={step.tags}
                        />
                      );
                    })}
                  </Stack>
                </CustomScrollbars>
                <Divider>
                  <Chip label="ADD TASK" color="secondary" size="small" />
                </Divider>
                <Stack
                  direction="row"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TextField
                    style={{ width: "55vw", padding: "1rem" }}
                    component="form"
                    color="primary"
                    size="medium"
                    placeholder="Add group"
                    variant="filled"
                    InputProps={{
                      color: "primary",
                      style: { color: "white", fontSize: "1.05rem" },
                    }}
                  />
                  <Divider orientation="vertical" />
                  <TagsInput
                    style={{ padding: "1rem" }}
                    selectedTags={handleSelectedTags}
                    fullWidth
                    variant="filled"
                    id="tags"
                    placeholder="Add Tags"
                  />
                </Stack>
              </Fragment>
            )}
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default Steps;
