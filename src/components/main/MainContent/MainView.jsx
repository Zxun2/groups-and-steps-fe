import SelectLabels from "../FilterComponent/ViewSelect";
import CustomScrollbars from "../../ui/CustomScollBars";
import FilterLabel from "../FilterComponent/Filter";
import AddTaskIcon from "../../svgs/AddtasksIcon";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import TagsInput from "../tag/tags-input";
import { Fragment } from "react";
import RenderSteps from "./RenderSteps";
import { Divider } from "@mui/material";
import { Box } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import { Chip } from "@material-ui/core";
import { Stack } from "@mui/material";

const MainView = ({
  steps,
  classes,
  toggleDetails,
  setToggleDetails,
  todoId,
  view,
  setView,
  value,
  setValue,
  addStepHandler,
  handleSelectedTags,
  selectedItem,
  setSelectedItem,
  stepRef,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={toggleDetails ? 8 : 12}>
        <Box
          className={`${classes.main} ${steps?.length === 0 && classes.notask}`}
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
                  Create a <span style={{ color: "#5865f2" }}>step</span> to get
                  started!
                </Typography>
              </Box>
            </Fragment>
          )}
          {steps?.length !== 0 && todoId !== -1 && (
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
                      value={value}
                      setValue={setValue}
                    />
                    <SelectLabels
                      toggleDetails={toggleDetails}
                      setToggleDetails={setToggleDetails}
                      setView={setView}
                    />
                  </Box>
                  <RenderSteps steps={steps} view={view} setValue={setValue} />
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
  );
};

export default MainView;
