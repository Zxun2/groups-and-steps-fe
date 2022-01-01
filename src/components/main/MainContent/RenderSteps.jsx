import React from "react";
import { Box, Stack, Collapse } from "@mui/material";
import { Chip } from "@material-ui/core";
import { Fragment } from "react";
import CustomScrollbars from "../../ui/CustomScollBars";
import { Divider } from "@mui/material";
import Task from "./Task";
import FilterLabel from "../FilterComponent/Filter";
import Grid from "@mui/material/Grid";
import { Badge } from "@material-ui/core";
// import StaticDatePickerLandscape from "../FilterComponent/DateFilter";
import SelectLabels from "../FilterComponent/ViewSelect";

const RenderSteps = (props) => {
  return (
    <Fragment>
      <Box className={props.classes.root}>
        <CustomScrollbars
          style={{ height: "100%" }}
          autoHide
          autoHideTimeout={500}
          autoHideDuration={200}
        >
          <Box className={props.classes.filter}>
            <FilterLabel
              steps={props.steps}
              value={props.value}
              setValue={props.setValue}
            />
            <SelectLabels
              toggleDetails={props.toggleDetails}
              setToggleDetails={props.setToggleDetails}
              setView={props.setView}
            />
          </Box>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={props.view === "Grid" ? 6 : 12}>
                <Divider style={{ marginBottom: "1rem" }}>
                  <Badge
                    color="secondary"
                    badgeContent={`${props.UncompletedCount}`}
                    invisible={
                      props.isOpenUncompleted || props.UncompletedCount === 0
                    }
                  >
                    <Chip
                      onClick={() =>
                        props.setOpenUncompleted(!props.isOpenUncompleted)
                      }
                      label={"UNCOMPLETED"}
                      color="primary"
                      size="medium"
                    />
                  </Badge>
                </Divider>
                <Collapse in={props.isOpenUncompleted}>
                  <Box>
                    {props.steps?.map((step) => {
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
              </Grid>
              <Grid item xs={12} md={props.view === "Grid" ? 6 : 12}>
                <Divider style={{ marginBottom: "1rem" }}>
                  <Badge
                    color="secondary"
                    badgeContent={`${props.CompletedCount}`}
                    invisible={
                      props.isOpenCompleted || props.CompletedCount === 0
                    }
                  >
                    <Chip
                      onClick={() =>
                        props.setOpenCompleted(!props.isOpenCompleted)
                      }
                      label={`COMPLETED`}
                      color="primary"
                      size="medium"
                    />
                  </Badge>
                </Divider>
                <Collapse in={props.isOpenCompleted}>
                  {props.steps.map((step) => {
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
              </Grid>
            </Grid>
          </Stack>
        </CustomScrollbars>
      </Box>
      <Divider>
        <Chip
          onClick={props.addStepHandler}
          label="ADD TASK"
          color="primary"
          size="medium"
        />
      </Divider>
    </Fragment>
  );
};

export default RenderSteps;
