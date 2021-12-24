import { FAIL } from "../../../actions/constants";
import AppIcon from "../../svgs/AppIcon";
import { Toolbar, Box, Stack, Collapse } from "@mui/material";
import { Typography, Chip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Fragment, useRef } from "react";
import { TextField } from "@material-ui/core";
import AddTaskIcon from "../../svgs/AddtasksIcon";
import CustomScrollbars from "../../ui/CustomScollBars";
import { Divider } from "@mui/material";
import Task from "./Task";
import TagsInput from "../Tags/TagsInput";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice";
import { useState } from "react";
import FilterLabel from "../FilterComponent/Filter";
import { stepStyles } from "../../ui/Style";
import { addStep } from "../../lib/api";
import useHttp from "../../hooks/useHttp";
import { Badge } from "@material-ui/core";

const Steps = (props) => {
  const classes = stepStyles();
  const [tags, setTags] = useState([]);
  const [isOpenUncompleted, setOpenUncompleted] = useState(true);
  const [isOpenCompleted, setOpenCompleted] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  const steps = useSelector((state) => state.step.temp);

  const stepRef = useRef();
  const dispatch = useDispatch();
  const { sendRequest: createStep } = useHttp(addStep, true);

  let UncompletedCount = 0;
  let CompletedCount = 0;
  steps?.map((step) => {
    if (step.completed) {
      return (CompletedCount += 1);
    } else {
      return (UncompletedCount += 1);
    }
  });

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
      createStep(
        {
          step: stepRef.current.value.trim(),
          tags: tags,
        },
        props.todoId
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
            className={classes.text}
            style={{ fontWeight: "600", display: "inline" }}
          >
            Welcome{" "}
            <span style={{ color: "#5865f2" }}>
              {props.userState?.currUser?.name}
            </span>
            ,
          </Typography>

          <Typography
            className={classes.text}
            variant="h4"
            color="secondary"
            style={{ fontWeight: "600", marginBottom: "2rem" }}
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
                    variant="h5"
                    color="secondary"
                    style={{
                      fontWeight: "400",
                      textAlign: "center",
                      marginTop: "2rem",
                    }}
                  >
                    Create a task to get started!
                  </Typography>
                </Box>
              </Fragment>
            )}
            {steps?.length !== 0 && (
              <Fragment>
                <Box className={classes.root}>
                  <CustomScrollbars
                    style={{ height: "100%" }}
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
                        <Badge
                          color="secondary"
                          badgeContent={`${UncompletedCount}`}
                          invisible={
                            isOpenUncompleted || UncompletedCount === 0
                          }
                        >
                          <Chip
                            onClick={() =>
                              setOpenUncompleted(!isOpenUncompleted)
                            }
                            label={"UNCOMPLETED"}
                            color="primary"
                            size="medium"
                          />
                        </Badge>
                      </Divider>
                      <Collapse in={isOpenUncompleted}>
                        <Box>
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
                        </Box>
                      </Collapse>
                      <Divider>
                        <Badge
                          color="secondary"
                          badgeContent={`${CompletedCount}`}
                          invisible={isOpenCompleted || CompletedCount === 0}
                        >
                          <Chip
                            onClick={() => setOpenCompleted(!isOpenCompleted)}
                            label={`COMPLETED`}
                            color="primary"
                            size="medium"
                          />
                        </Badge>
                      </Divider>
                      <Collapse in={isOpenCompleted}>
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
                      </Collapse>
                    </Stack>
                  </CustomScrollbars>
                </Box>
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
              direction={steps?.length === 0 ? "column" : "row"}
              className={classes.inputField}
              style={{ width: `${steps?.length === 0 ? "50%" : "100%"}` }}
            >
              <TextField
                fullWidth
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
              {steps?.length === 0 && (
                <Chip
                  onClick={addStepHandler}
                  color="primary"
                  label="ADD TASK"
                  size="medium"
                  style={{
                    width: "7rem",
                    marginTop: "2rem",
                  }}
                />
              )}
            </Stack>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default Steps;
