import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { scrollStyle } from "styles/Style";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "hooks/useHooks";
import {
  getCompletedAndUncompletedSteps,
  updateCurrStep,
} from "store/steps-slice";
import { getUserState } from "store/user-slice";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import { useHttp2 } from "hooks/useHttp";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  position: "relative",
  zIndex: 1,
  height: "10vh",
  backgroundColor: "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
  "& : hover": {
    color: "#28282b",
    cursor: "pointer",
  },
  width: "14rem",
  boxShadow: "5px 10px rgba(0,0,0,0.1)",
}));
const Reminders = () => {
  const classes = scrollStyle();
  const { uncompleted } = useAppSelector(getCompletedAndUncompletedSteps);
  const { currUser } = useAppSelector(getUserState);
  const { sendRequest: updateStep } = useHttp2(updateCurrStep);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  uncompleted.sort((a, b) => {
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

  const completeStepHandler = (todo_id: number, step_id: number) => {
    return updateStep({
      todo_id,
      step_id,
      content: {
        completed: true,
      },
    });
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
        <Box sx={{ maxWidth: "80vw" }} className={classes.scroll}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, px: 1, display: "flex", alignItems: "center" }}
          >
            {uncompleted.length > 0 &&
              uncompleted.map((step) => {
                return (
                  <Box key={step.id}>
                    <Widget
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                      onClick={completeStepHandler.bind(
                        null,
                        step.todo_id,
                        step.id
                      )}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ minWidth: 0, color: "#fff" }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={500}
                          >
                            {currUser?.name}
                          </Typography>
                          <Typography noWrap>{step.step}</Typography>
                          <Typography
                            variant="caption"
                            noWrap
                            letterSpacing={-0.25}
                          >
                            Tags: {step.tags.join(", ")}
                          </Typography>
                        </Box>
                      </Box>
                    </Widget>
                    <Popover
                      sx={{
                        pointerEvents: "none",
                      }}
                      open={open}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <Typography sx={{ p: 1 }}>
                        Click to complete the task!
                      </Typography>
                    </Popover>
                  </Box>
                );
              })}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Reminders;
