import { Box, Stack, Collapse } from "@mui/material";
import { Badge } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import Task from "./Task";
import { useSelector } from "react-redux";
import {
  getAllSteps,
  getCompletedCount,
  getUncompletedCount,
} from "../../../store/steps-slice";

const RenderSteps = (props) => {
  const [isOpenUncompleted, setOpenUncompleted] = useState(true);
  const [isOpenCompleted, setOpenCompleted] = useState(true);

  // Count
  const UncompletedCount = useSelector(getUncompletedCount);
  const CompletedCount = useSelector(getCompletedCount);

  const steps = useSelector(getAllSteps);

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={props.view === "Grid" ? 6 : 12}>
          <Divider style={{ marginBottom: "1rem" }}>
            <Badge
              color="secondary"
              badgeContent={`${UncompletedCount}`}
              invisible={isOpenUncompleted || UncompletedCount === 0}
            >
              <Chip
                onClick={() => setOpenUncompleted(!isOpenUncompleted)}
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
                      setValue={props.setValue}
                      step={step.step} // name
                      completed={step.completed}
                      todo_id={step.todo_id}
                      updated_at={step.updated_at}
                      tags={step.tags}
                      deadline={step.deadline}
                      created_at={step.created_at}
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
        </Grid>
      </Grid>
    </Stack>
  );
};

export default RenderSteps;
