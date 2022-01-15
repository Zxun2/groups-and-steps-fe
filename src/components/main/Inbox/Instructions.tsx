import StepConnector from "@mui/material/StepConnector";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@material-ui/core";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import * as React from "react";
import steps from "../../../utils/data";
import StepIcon from "./StepIcon";

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
        Groups and Steps
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
        A Web application built using Rails and React for CVWO 2021 assignment.
        The design is inspired by Discord and Microsoft To-Do.
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
                    color: "#ffffff !important",
                    fontSize: "1.12rem",
                  },
                }}
                optional={
                  index === 3 ? (
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
                    <Typography key={Math.random()} paragraph color="secondary">
                      {para}
                    </Typography>
                  );
                })}
                <Box sx={{ margin: "1rem 0 1rem 0" }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        mt: 1,
                        mr: 1,
                        backgroundColor: "#5865f2",
                        "&: hover": { backgroundColor: "#404ff0" },
                      }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1, color: "white" }}
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
            <Button
              onClick={handleReset}
              sx={{ mt: 1, mr: 1, color: "#5865f2" }}
            >
              Read again
            </Button>
          </Paper>
        )}
      </Box>
    </Fragment>
  );
};

export default Instructions;
