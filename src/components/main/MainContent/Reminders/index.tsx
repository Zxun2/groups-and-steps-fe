import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { scrollStyle } from "styles/Style";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "hooks/useHooks";
import { getCompletedAndUncompletedSteps } from "store/steps-slice";
import Reminder from "./Widget";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Step } from "types";
import { useEffect, useMemo, useState } from "react";

const Reminders = () => {
  const classes = scrollStyle();
  const { uncompleted } = useAppSelector(getCompletedAndUncompletedSteps);

  const steps = useMemo(() => {
    return uncompleted.sort((a, b) => {
      if (a.deadline && b.deadline) {
        if (new Date(a.deadline) < new Date(b.deadline)) {
          return -1;
        }
        return 1;
      }
      if (a.deadline) {
        return -1;
      }
      return 1;
    });
  }, [uncompleted]);

  const [state, setState] = useState(steps);

  useEffect(() => {
    setState(steps);
  }, [steps]);

  // a little function to help us with reordering the result
  const reorder = (list: Step[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(state, result.source.index, result.destination.index);

    setState(items);
  };

  return (
    <Grid container>
      <Grid item md={2} xs={12}>
        <Typography
          variant="h5"
          style={{ fontWeight: 600, margin: "1rem 0 1rem 1rem" }}
          className={uncompleted.length === 0 ? classes.notasks : classes.title}
        >
          {uncompleted.length > 0
            ? "Your upcoming tasks"
            : "Great! You dont have any outstanding steps!"}
        </Typography>
      </Grid>
      <Grid item md={10} style={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "80vw" }} className={classes.scroll}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, _) => (
                <Stack
                  ref={provided.innerRef}
                  spacing={2}
                  direction="row"
                  sx={{ mb: 1, px: 1, display: "flex", alignItems: "center" }}
                  {...provided.droppableProps}
                >
                  {state.length > 0 &&
                    state.map((step, indx) => {
                      return (
                        <Draggable
                          key={step.id}
                          draggableId={JSON.stringify(step.id)}
                          index={indx}
                        >
                          {(provided, _) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Reminder step={step} />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Reminders;
