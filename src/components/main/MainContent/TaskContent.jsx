import React from "react";
import { Typography } from "@material-ui/core";
import CardContent from "@mui/material/CardContent";

const TaskContent = ({ step, deadline, currDeadline, daysLeft }) => {
  return (
    <CardContent style={{ paddingBottom: "0", paddingTop: "0.5rem" }}>
      {step.split("\\n").map((str, idx) => {
        if (idx === 0) {
          return (
            <Typography
              key={idx}
              variant="subtitle1"
              color="secondary"
              style={{ fontWeight: "700" }}
              paragraph={true}
            >
              {str.trim()}
            </Typography>
          );
        } else {
          return (
            <Typography
              key={idx}
              variant="subtitle2"
              color="secondary"
              style={{ fontWeight: "500" }}
              paragraph={true}
            >
              {str.trim()}
            </Typography>
          );
        }
      })}
      {deadline && (
        <>
          <Typography
            variant="subtitle2"
            color="secondary"
            style={{ fontWeight: "400", fontStyle: "italic" }}
          >
            <span style={{ color: "#B33A3A" }}>Take note </span>: This step
            {daysLeft > 0 ? " is expiring" : " has expired"} on {currDeadline}
          </Typography>
        </>
      )}
    </CardContent>
  );
};

export default TaskContent;
