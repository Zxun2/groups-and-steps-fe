import { FAIL } from "../../actions/constants";
import AppIcon from "../svgs/AppIcon";
import { Toolbar, Box, Stack } from "@mui/material";
import { Typography, Chip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Fragment, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import { LinearProgress, TextField } from "@material-ui/core";
import AddTaskIcon from "../svgs/AddtasksIcon";
import CustomScrollbars from "../ui/CustomScollBars";
import { Divider } from "@mui/material";
import Task from "./Task";
import TagsInput from "./TagsInput";
import { useDispatch } from "react-redux";
import { uiAction } from "../store/ui-slice";
import { useState } from "react";
import { addStepData } from "../store/steps-slice";

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
    justifyContent: "space-evenly",
  },
}));

const Steps = (props) => {
  const classes = useStyles();
  const steps = useSelector((state) => state.step.steps);
  const status = useSelector((state) => state.ui.globalState);
  const [tags, setTags] = useState([]);
  const stepRef = useRef();
  const dispatch = useDispatch();

  const addStep = () => {
    if (stepRef.current.value.trim() === "") {
      dispatch(
        uiAction.showNotification({
          status: FAIL,
          title: "Error",
          message: "Step must not be empty!",
        })
      );
    } else {
      dispatch(
        addStepData(
          {
            step: stepRef.current.value.trim(),
            tags: tags,
          },
          props.todoId
        )
      );
    }
    stepRef.current.value = "";
  };

  const addStepHandler = (e) => {
    e.preventDefault();
    addStep();
  };

  // Function is called in TagsInput.jsx
  // To return selected tags
  function handleSelectedTags(items) {
    setTags(items);
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        // width: { sm: `calc(100% - ${drawerWidth}px)` },
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
              steps?.length === 0 && classes.notask
            }`}
          >
            {status === "loading" && <LinearProgress color="primary" />}
            {steps?.length === 0 && (
              <Fragment>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <AddTaskIcon />
                  <Typography
                    variant="subtitle2"
                    color="secondary"
                    style={{ fontWeight: "600" }}
                  >
                    Create a task to get started!
                  </Typography>
                </Box>
              </Fragment>
            )}
            {steps?.length !== 0 && (
              <Fragment>
                <CustomScrollbars
                  style={{ height: "75vh" }}
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                >
                  <Stack spacing={3}>
                    <Divider>
                      <Chip label="UNCOMPLETED" color="primary" size="medium" />
                    </Divider>
                    {steps?.map((step) => {
                      return (
                        !step.completed && (
                          <Task
                            key={step.id}
                            id={step.id}
                            step={step.step}
                            completed={step.completed}
                            todo_id={step.todo_id}
                            updated_at={step.updated_at}
                            tags={step.tags}
                          />
                        )
                      );
                    })}
                    <Divider>
                      <Chip label="COMPLETED" color="primary" size="medium" />
                    </Divider>
                    {steps.map((step) => {
                      return (
                        step?.completed && (
                          <Task
                            key={step.id}
                            id={step.id}
                            step={step.step}
                            completed={step.completed}
                            todo_id={step.todo_id}
                            updated_at={step.updated_at}
                            tags={step.tags}
                          />
                        )
                      );
                    })}
                  </Stack>
                </CustomScrollbars>
                <Divider>
                  <Chip label="ADD TASK" color="primary" size="medium" />
                </Divider>
              </Fragment>
            )}
            <Stack
              direction="row"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <TextField
                style={{ width: "55vw" }}
                component="form"
                color="primary"
                size="medium"
                placeholder="Add steps"
                onSubmit={addStepHandler}
                inputRef={stepRef}
                variant="filled"
                InputProps={{
                  color: "primary",
                  style: { color: "white", fontSize: "1.05rem" },
                }}
              />
              <TagsInput
                selectedTags={handleSelectedTags}
                fullWidth
                variant="filled"
                id="tags"
                placeholder="Add Tags"
              />
            </Stack>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default Steps;
