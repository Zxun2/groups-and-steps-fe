import { Typography } from "@material-ui/core";
import { Fragment } from "react";

const Instructions = () => {
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
      <Typography
        style={{
          fontWeight: "400",
          textAlign: "center",
          color: "#f2f2f2f2",
          margin: "1rem",
        }}
        variant="subtitle1"
        paragraph={true}
      >
        When you enter the application for the first time, you will be prompted
        to log in with your credentials. Once authorized, you will be assigned a
        JWT token that will be saved in your local storage. This token is
        important for you to access other portions of the application as well as
        subsequent access during the lock-in period. The Lock-in duration is 24
        hours.
      </Typography>
      <Typography
        style={{
          fontWeight: "400",
          textAlign: "center",
          color: "#f2f2f2f2",
          margin: "1rem",
        }}
        variant="subtitle1"
        paragraph={true}
      >
        The first thing you should do is observe the Login Page's wonderful
        loading animations and SVGs. Once that is done, head over to the main
        dashboard and let's get started with the application tour!
      </Typography>

      <Typography
        style={{
          fontWeight: "400",
          textAlign: "center",
          color: "#f2f2f2f2",
          margin: "1rem",
        }}
        variant="subtitle1"
        paragraph={true}
      >
        To view your groups, simply open the sidebar (it should already be
        opened by default, unless you're on mobile then you'll be required to
        click on the hamburger menu on the top left corner of your screen) and
        enter any Todo of your choice at the bottom of the screen to create a
        new group.
      </Typography>

      <Typography
        style={{
          fontWeight: "400",
          textAlign: "center",
          color: "#f2f2f2f2",
          margin: "1rem",
        }}
        variant="subtitle1"
        paragraph={true}
      >
        To delete/update a group, click on the settings icon beside the Todo and
        a modal component similar to the one you're currently viewing will
        appear. Follow the instructions there.
      </Typography>

      <Typography
        style={{
          fontWeight: "400",
          textAlign: "center",
          color: "#f2f2f2f2",
          margin: "1rem",
        }}
        variant="subtitle1"
        paragraph={true}
      >
        Now, let's try clicking on one of them! If there are no current steps,
        then you should see a placeholder SVG (credits to Undraw.io) as well as
        a prompt to create a new step. Let's do just that! Enter your step into
        the input box on the left, add any tags you wish to have on the right
        and navigate back to the left input box and press ENTER.
      </Typography>
      <Typography
        style={{
          fontWeight: "400",
          textAlign: "center",
          color: "#f2f2f2f2",
          margin: "1rem",
        }}
        variant="subtitle1"
        paragraph={true}
      >
        Yay, you've created your first task! To complete your task, navigate to
        the vertical floating icon on the top right of the card, click on it and
        indicate that you wish to complete the task.
      </Typography>
      <Typography
        style={{
          fontWeight: "400",
          textAlign: "center",
          color: "#f2f2f2f2",
          margin: "1rem",
        }}
        variant="subtitle1"
        paragraph={true}
      >
        How do we delete/update steps? Click on the icon just right below the
        vertical floating icon and follow the instructions there!
      </Typography>
    </Fragment>
  );
};

export default Instructions;
