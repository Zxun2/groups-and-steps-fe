import { FAIL } from "../../../misc/constants";
import { Toolbar, Box, Stack } from "@mui/material";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Fragment, useRef } from "react";
import { TextField } from "@material-ui/core";
import AddTaskIcon from "../../svgs/AddtasksIcon";
import TagsInput from "../Tags/TagsInput";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice";
import { useState } from "react";
import { stepStyles } from "../../ui/Style";
import { addStep } from "../../lib/api";
import useHttp from "../../hooks/useHttp";
import Grid from "@mui/material/Grid";
import SelectLabels from "../FilterComponent/ViewSelect";
import FilterLabel from "../FilterComponent/Filter";
// import StaticDatePickerLandscape from "../FilterComponent/DateFilter";
import CustomScrollbars from "../../ui/CustomScollBars";
import RenderSteps from "./RenderSteps";
import Landing from "./Landing";
import { Chip } from "@material-ui/core";
import { Divider } from "@mui/material";

const Steps = (props) => {
  const classes = stepStyles();
  const dispatch = useDispatch();

  const stepRef = useRef();

  const [isOpenUncompleted, setOpenUncompleted] = useState(true);
  const [isOpenCompleted, setOpenCompleted] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  const [view, setView] = useState("Layered");
  const [toggleDetails, setToggleDetails] = useState(false);
  const [tags, setTags] = useState([]);

  const steps = useSelector((state) => state.step.temp);
  const { sendRequest: createStep } = useHttp(addStep, true);

  // Count
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
        minHeight: "100vh",
      }}
    >
      {(props.title === "" || props.Todos.length === 0) && (
        <Landing classes={classes} userState={props.userState} />
      )}
      {props.title !== "" && (
        <Fragment>
          <Toolbar />
          <Grid container spacing={2}>
            <Grid item xs={12} md={toggleDetails ? 8 : 12}>
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
                        justifyContent: "center",
                      }}
                    >
                      <AddTaskIcon />
                      <Typography
                        variant="h4"
                        color="secondary"
                        style={{
                          fontWeight: "400",
                          textAlign: "center",
                          margin: "2rem 0 0 0",
                        }}
                      >
                        Create a <span style={{ color: "#5865f2" }}>step</span>{" "}
                        to get started!
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
                        <Box className={classes.filter}>
                          <FilterLabel
                            steps={steps}
                            value={props.value}
                            setValue={props.setValue}
                          />
                          <SelectLabels
                            toggleDetails={toggleDetails}
                            setToggleDetails={setToggleDetails}
                            setView={setView}
                          />
                        </Box>
                        <RenderSteps
                          steps={steps}
                          view={view}
                          isOpenCompleted={isOpenCompleted}
                          CompletedCount={CompletedCount}
                          setOpenCompleted={setOpenCompleted}
                          isOpenUncompleted={isOpenUncompleted}
                          UncompletedCount={UncompletedCount}
                          setOpenUncompleted={setOpenUncompleted}
                        />
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
                  direction={"column"}
                  className={classes.inputField}
                  style={{
                    width: `${steps?.length === 0 ? "70% " : "100% "}`,
                  }}
                >
                  <TagsInput
                    selectedTags={handleSelectedTags}
                    fullWidth
                    variant="filled"
                    id="tags"
                    placeholder="Enter to add Tags"
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
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
                </Stack>
              </Box>
            </Grid>
            {toggleDetails && (
              <Grid item xs={0} md={4}>
                <Box
                  className={`${classes.main} ${
                    steps?.length === 0 && classes.notask
                  }`}
                  style={{ height: "100%" }}
                >
                  {/* <StaticDatePickerLandscape /> */}
                  <p>A work in progress...</p>
                </Box>
              </Grid>
            )}
          </Grid>
        </Fragment>
      )}
    </Box>
  );
};

export default Steps;
