import { Typography } from "@material-ui/core";
import { Fragment } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import { Button } from "@material-ui/core";
import Check from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import StepConnector from "@mui/material/StepConnector";

const steps = [
  {
    label: "Welcome to the application!",
    description: `
    When you enter the application for the first time, you will be prompted to log in with your credentials. Once authorized, you will be assigned a JWT token that will be saved in your local storage. This token is important for you to access other portions of the application as well as subsequent access during the lock-in period. 
    
    The Lock-in duration is 24 hours.
    `,
  },
  {
    label: "Groups",
    description: `To view your groups, simply open the sidebar (it should already be opened by default, unless you're on mobile then you'll be required to click on
    the hamburger menu on the top left corner of your screen). Enter the title of your group at the bottom of the screen to create a new group. To delete or update a group, click on the settings icon beside the Group's title and a modal component similar to the one you're currently viewing will appear. 
    
    Follow the instructions there.
    `,
  },
  {
    label: "Steps",
    description: `
    Now, let's try creating our first step. If there are no current steps, then you should see a placeholder SVG (credits to Undraw.io) as well as a prompt to create a new step. Enter your step into the input box on the left, add any tags you wish to have on the right and navigate back to the left input box and press ENTER. 
    
    To complete your task, navigate to the vertical floating icon on the top right of the card, click on it and indicate that you wish to complete the task.

    Finally, to delete or update the step, click on the icon just right below the vertical floating icon and follow the instructions there!
    `,
  },
  {
    label: "Final Word",
    description: `My name is Zong Xun, a current computer science undergraduate at NUS. This is my first major application. I hope you like it! Also, do take the time to browse through the application. Who knows, you might find something!
    `,
  },
];
const StepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.grey[700],
  display: "flex",
  height: 30,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#5865f2",
  }),
  "& .StepIcon-completedIcon": {
    color: "#5865f2",
    zIndex: 1,
    fontSize: 20,
  },
  "& .StepIcon-circle": {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function StepIcon(props) {
  const { active, completed, className } = props;

  return (
    <StepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="StepIcon-completedIcon" />
      ) : (
        <div className="StepIcon-circle" />
      )}
    </StepIconRoot>
  );
}

const Instructions = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Fragment>
      <Typography
        style={{
          fontWeight: "600",
          textAlign: "center",
          margin: "2rem 1rem 1rem 1rem",
        }}
        variant="h5"
        color="secondary"
      >
        Introduction and Instructions
      </Typography>
      <Typography
        style={{
          fontWeight: "400",
          textAlign: "center",
          color: "#cccccc",
        }}
        variant="subtitle1"
      >
        For dummies.
      </Typography>

      <Typography
        style={{
          fontWeight: "400",
          textAlign: "center",
          color: "#bfbfbfbf",
          margin: "1rem",
        }}
        variant="subtitle2"
        paragraph={true}
      >
        Groups and Steps — a Web application built using Rails and React for
        CVWO 2021 assignment. The design is inspired by Discord and Microsoft
        To-Do.
      </Typography>
      <Typography
        style={{
          fontWeight: "400",
          textAlign: "center",
          color: "#bfbfbfbf",
          margin: "1rem",
        }}
        variant="subtitle2"
        paragraph={true}
      >
        You can revisit these instructions by clicking on the inbox icon at the
        top right hand corner.
      </Typography>

      <Box
        sx={{
          margin: "0 1rem 0 1rem",
          backgroundColor: "#36393f",
          maxWidth: 500,
        }}
      >
        <Stepper
          activeStep={activeStep}
          connector={<StepConnector />}
          orientation="vertical"
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={StepIcon}
                sx={{
                  "	.MuiStepLabel-label": {
                    color: "#ffffff",
                    fontSize: "1.12rem",
                  },
                }}
                optional={
                  index === 2 ? (
                    <Typography color="secondary" variant="caption">
                      Last step
                    </Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {step.description.split("\n").map((para) => {
                  return (
                    <Typography paragraph color="secondary">
                      {para}
                    </Typography>
                  );
                })}
                <Box sx={{ margin: "1rem 0 1rem 0" }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      color="primary"
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                      color="secondary"
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 2 }}>
            <Typography>All steps are completed - that's it!.</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Read again
            </Button>
          </Paper>
        )}
      </Box>
    </Fragment>
  );
};

export default Instructions;
