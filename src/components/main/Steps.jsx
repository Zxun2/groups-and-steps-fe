import { FAIL } from "../../actions/constants";
import AppIcon from "../svgs/AppIcon";
import { Toolbar, Box, Stack } from "@mui/material";
import { Typography, Chip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Fragment, useRef } from "react";
import { LinearProgress, TextField } from "@material-ui/core";
import AddTaskIcon from "../svgs/AddtasksIcon";
import CustomScrollbars from "../ui/CustomScollBars";
import { Divider } from "@mui/material";
import Task from "./Task";
import TagsInput from "./TagsInput";
import { useDispatch } from "react-redux";
import { uiAction } from "../store/ui-slice";
import { useState } from "react";
import { StepCreators } from "../store/steps-slice";
import FilterLabel from "./Filter";
import { stepStyles } from "../ui/Style";
import { addStep } from "../lib/api";

const Steps = (props) => {
  const classes = stepStyles();
  const status = useSelector((state) => state.ui.globalState);
  const [tags, setTags] = useState([]);
  const [isOpenUncompleted, setOpenUncompleted] = useState(true);
  const [isOpenCompleted, setOpenCompleted] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const steps = useSelector((state) => state.step.temp);
  const stepRef = useRef();
  const dispatch = useDispatch();

  const addStepToDatabase = () => {
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
        StepCreators(
          addStep,
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
    addStepToDatabase();
    setSelectedItem([]);
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
                  <FilterLabel
                    steps={steps}
                    value={props.value}
                    setValue={props.setValue}
                  />
                  <Stack spacing={3}>
                    <Divider>
                      <Chip
                        onClick={() => setOpenUncompleted(!isOpenUncompleted)}
                        label="UNCOMPLETED"
                        color="primary"
                        size="medium"
                      />
                    </Divider>
                    {isOpenUncompleted &&
                      steps?.map((step) => {
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
                      <Chip
                        onClick={() => setOpenCompleted(!isOpenCompleted)}
                        label="COMPLETED"
                        color="primary"
                        size="medium"
                      />
                    </Divider>
                    {isOpenCompleted &&
                      steps.map((step) => {
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
                  <Chip
                    onClick={addStepHandler}
                    label="ADD TASK"
                    color="primary"
                    size="medium"
                  />
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
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </Stack>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default Steps;
