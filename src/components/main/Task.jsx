import React, { Fragment, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Typography, TextField, CardHeader } from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// Returns a hex code for an attractive color
import randomColor from "randomcolor";
import { Chip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  deleteStepData,
  stepsAction,
  updateStepData,
} from "../store/steps-slice";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Task(props) {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const {
    updated_at,
    id: step_id,
    step,
    completed,
    todo_id,
    tags,
  } = { ...props };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // UPDATE DATABASE
    dispatch(
      updateStepData(todo_id, step_id, { completed: completed ? false : true })
    );

    // UPDATE UI
    dispatch(
      stepsAction.updateStep({
        id: step_id,
        data: {
          completed: completed ? false : true,
        },
      })
    );
  };
  const handleUnchangeClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const updateStepHandler = (e) => {
    e.preventDefault();
    // UPDATE DATABASE
    dispatch(
      updateStepData(todo_id, step_id, { step: inputRef.current.value })
    );

    // UPDATE UI
    dispatch(
      stepsAction.updateStep({
        id: step_id,
        data: {
          step: inputRef.current.value,
        },
      })
    );

    setExpanded(!expanded);
  };

  const deleteStepHandler = () => {
    // UPDATE DATABASE
    dispatch(deleteStepData(todo_id, step_id));

    // UPDATE UI
    dispatch(
      stepsAction.removeStep({
        id: step_id,
      })
    );

    setExpanded(!expanded);
  };

  const date = new Date(updated_at).toDateString();

  return (
    <Fragment>
      <Card sx={{ maxWidth: "100%", backgroundColor: "#2f3136" }}>
        <CardHeader
          action={
            <Fragment>
              <IconButton onClick={handleClick}>
                <MoreVertIcon style={{ color: "#ffffff" }} />
              </IconButton>
              <Menu
                color="primary"
                anchorEl={anchorEl}
                open={open}
                onClose={handleUnchangeClose}
              >
                <MenuItem onClick={handleClose}>
                  {completed ? "Uncomplete Task" : "Complete task"}
                </MenuItem>
              </Menu>
            </Fragment>
          }
          title={date}
          titleTypographyProps={{ variant: "body2", color: "secondary" }}
          style={{ paddingBottom: "0" }}
        />
        <CardContent style={{ paddingBottom: "0", paddingTop: "0.5rem" }}>
          <Typography
            variant="subtitle1"
            color="secondary"
            style={{ fontWeight: "700" }}
          >
            {step}
          </Typography>
        </CardContent>
        <CardActions disableSpacing={true} style={{ paddingBottom: "0" }}>
          {tags?.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              style={{ paddingLeft: "0.5rem", alignItems: "center" }}
            >
              <Typography color="secondary" variant="body2">
                Tags:{" "}
              </Typography>
              {tags.map((tag, index) => {
                const color = randomColor();
                return (
                  <Chip
                    key={index}
                    label={tag}
                    variant="outlined"
                    color="primary"
                    style={{ color: `${color}` }}
                  />
                );
              })}
            </Stack>
          )}
          <ExpandMore expand={expanded} onClick={handleExpandClick}>
            <ExpandMoreIcon style={{ color: "#ffffff" }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{ paddingTop: "0" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "revert",
              }}
            >
              <Typography
                style={{
                  fontWeight: "600",
                  textAlign: "center",
                  margin: "1rem",
                }}
                variant="h5"
                color="secondary"
              >
                Change your task
              </Typography>
              <Typography
                style={{
                  fontWeight: "400",
                  textAlign: "center",
                  color: "#cccccc",
                }}
                variant="subtitle1"
              >
                Enter your new task below or click the delete button to delete
                Todo.
              </Typography>
              <TextField
                id="title"
                component="form"
                color="primary"
                onSubmit={updateStepHandler}
                size="medium"
                variant="filled"
                style={{ marginTop: "1rem" }}
                inputRef={inputRef}
                InputProps={{
                  style: { color: "white", fontSize: "1.05rem" },
                }}
              />
              <Box style={{ display: "inline-flex", justifyContent: "end" }}>
                <Button
                  variant="outlined"
                  color="error"
                  style={{ marginTop: "1rem" }}
                  startIcon={<DeleteIcon />}
                  onClick={deleteStepHandler}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
      <Divider />
    </Fragment>
  );
}
