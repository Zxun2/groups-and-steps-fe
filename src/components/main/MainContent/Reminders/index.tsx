import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { scrollStyle } from "styles/Style";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "hooks/useHooks";
import { getCompletedAndUncompletedSteps } from "store/steps-slice";
import Reminder from "./Widget";

const Reminders = () => {
  const classes = scrollStyle();
  const { uncompleted } = useAppSelector(getCompletedAndUncompletedSteps);

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
                  <div key={step.id}>
                    <Reminder step={step} />
                  </div>
                );
              })}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Reminders;
