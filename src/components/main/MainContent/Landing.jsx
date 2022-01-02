import { Typography } from "@material-ui/core";
import AppIcon from "../../svgs/AppIcon";
import { Box } from "@mui/material";
import React from "react";

const Landing = (props) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        color="secondary"
        className={props.classes.text}
        style={{ fontWeight: "600", display: "inline" }}
      >
        Welcome{" "}
        <span style={{ color: "#5865f2" }}>
          {props.userState?.currUser?.name}
        </span>
        ,
      </Typography>

      <Typography
        className={props.classes.text}
        variant="h4"
        color="secondary"
        style={{ fontWeight: "600", marginBottom: "2rem" }}
      >
        Create/Select a group to get started!
      </Typography>
      <AppIcon />
    </Box>
  );
};

export default Landing;
