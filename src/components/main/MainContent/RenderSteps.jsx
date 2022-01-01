import React from "react";
import { Box, Stack, Collapse } from "@mui/material";
import { Chip } from "@material-ui/core";
import { Divider } from "@mui/material";
import Task from "./Task";
import Grid from "@mui/material/Grid";
import { Badge } from "@material-ui/core";

const RenderSteps = (props) => {
  return (
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
              invisible={props.isOpenCompleted || props.CompletedCount === 0}
            >
              <Chip
                onClick={() => props.setOpenCompleted(!props.isOpenCompleted)}
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
  );
};

export default RenderSteps;
