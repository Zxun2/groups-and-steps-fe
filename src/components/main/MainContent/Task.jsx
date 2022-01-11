import { Typography, TextField, Badge } from "@material-ui/core";
import React, { Fragment, useRef, useState } from "react";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Divider } from "@mui/material";
import { useHttp2 } from "../../../hooks/useHttp";
import TagsInput from "../Tag/TagsInput";
import {
  updateCurrStep,
  deleteCurrStep,
  stepAction,
} from "../../../store/steps-slice";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useDispatch } from "react-redux";
import { uiAction } from "../../../store/ui-slice";
import { FAIL } from "../../../misc/constants";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import TaskContent from "./TaskContent";
import TaskHeader from "./TaskHeader";
import TaskTags from "./TaskTags";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  flexGrow: 1,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#5865f2",
  },
}));

// Styled Components
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

function getNumberOfDays(start, end) {
  if (start === "" || end === "") {
    return;
  }

  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // Calculating the time difference between two dates
  const diffInTime = Math.abs(date2.getTime() - date1.getTime());
  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays;
}

export default function Task({
  updated_at,
  created_at,
  id: step_id,
  step,
  completed,
  todo_id,
  tags,
  deadline,
  setValue,
}) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [newTags, setNewTags] = useState(tags);

  const inputRef = useRef();

  const { sendRequest: updateStep } = useHttp2(updateCurrStep);
  const { sendRequest: deleteStep } = useHttp2(deleteCurrStep);

  const open = Boolean(anchorEl);

  const ref = useRef();
  const [dateValue, setDateValue] = useState(
    deadline ? format(new Date(deadline), "MM/dd/yyyy") : null
  );

  let newDeadline = "";
  const currDeadline = deadline;
  const daysApart =
    deadline && updated_at
      ? getNumberOfDays(new Date(created_at), new Date(deadline))
      : "";

  const daysPassed =
    deadline && updated_at
      ? getNumberOfDays(new Date(created_at), new Date())
      : "";

  const daysLeft = daysApart - daysPassed;
  const progress = Math.ceil((daysPassed / daysApart) * 100);

  // Function is called in TagsInput.jsx
  // To return selected tags
  function handleSelectedTags(items) {
    setNewTags(items);
  }

  const handleClose = async () => {
    setAnchorEl(null);

    updateStep({
      todo_id,
      step_id,
      content: {
        completed: completed ? false : true,
      },
    });
  };

  const updateStepHandler = (e) => {
    e.preventDefault();

    if (ref.current.value !== "") {
      const newDate = new Date(ref.current.value);

      if (newDate.getDate() < new Date().getDate()) {
        dispatch(
          uiAction.showNotification({
            status: FAIL,
            _title: "Error!",
            message: "Please ensure that your deadline is valid.",
          })
        );

        return;
      }

      newDeadline = format(newDate, "dd/MM/yyyy");
    }

    updateStep({
      todo_id,
      step_id,
      content: {
        step: inputRef.current.value,
        tags: newTags,
        deadline: newDeadline || "",
      },
    });

    setExpanded(!expanded);
  };

  const deleteStepHandler = () => {
    // Reset filters
    dispatch(
      stepAction.filterStep({
        filterArr: [],
      })
    );

    // Clean up filters
    setValue((prev) => {
      if (prev) {
        prev.filter((tags) => tags.id !== step_id);
      }
    });

    deleteStep({ todo_id, step_id });

    setExpanded(!expanded);
  };

  const date = new Date(updated_at).toDateString();

  return (
    <Fragment>
      {/* EXPLORE GRID HERE */}
      <Card sx={{ maxWidth: "100%", backgroundColor: "#2f3136" }}>
        <TaskHeader
          date={date}
          completed={completed}
          handleClose={handleClose}
          setAnchorEl={setAnchorEl}
          open={open}
          anchorEl={anchorEl}
        />

        {/* Explore how to add markdown content here */}
        <TaskContent
          step={step}
          deadline={deadline}
          daysLeft={daysLeft}
          currDeadline={currDeadline}
        />

        <CardActions disableSpacing={true} style={{ paddingBottom: "0" }}>
          <TaskTags tags={tags} />

          {/* STYLED COMPONENT USED HERE */}
          <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
            {daysLeft < 4 && deadline ? (
              <Badge color="error" invisible={expanded} variant="dot">
                <ExpandMoreIcon style={{ color: "#ffffff" }} />
              </Badge>
            ) : (
              <ExpandMoreIcon style={{ color: "#ffffff" }} />
            )}
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{ paddingTop: "0" }}>
            {deadline && (
              <>
                {daysLeft < 4 && (
                  <>
                    <Typography
                      color="error"
                      paragraph
                      style={{ textAlign: "center" }}
                    >
                      {daysLeft > 0
                        ? `Your task is expiring in ${daysLeft} days! Please complete
                      it or extend the deadline if you wish.`
                        : `Your task has expired on ${currDeadline}. Please update your deadline`}
                    </Typography>
                  </>
                )}
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    style={{ marginRight: "0.5rem" }}
                    color="secondary"
                  >
                    Current Progress:
                  </Typography>
                  <BorderLinearProgress
                    variant="determinate"
                    value={progress}
                  />
                </Box>
              </>
            )}

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
              <TagsInput
                fullWidth
                variant="filled"
                id="tags"
                placeholder="Enter to add Tags"
                selectedItem={selectedItem}
                selectedTags={handleSelectedTags}
                setSelectedItem={setSelectedItem}
                tags={tags}
              />
              <TextField
                id="title"
                component="form"
                color="primary"
                onSubmit={updateStepHandler}
                size="medium"
                variant="filled"
                defaultValue={step}
                inputRef={inputRef}
                InputProps={{
                  style: { color: "white", fontSize: "1.05rem" },
                }}
              />

              <Box
                style={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem 0 ",
                }}
              >
                {!completed && (
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      style={{ marginRight: "1rem" }}
                    >
                      Set a deadline :
                    </Typography>
                    <Box component="form" onSubmit={updateStepHandler}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          mask="__/__/____"
                          openTo="year"
                          views={["year", "month", "day"]}
                          value={dateValue}
                          minDate={new Date()}
                          format="DD-MM-YYYY"
                          InputProps={{
                            style: {
                              color: "#ffffff",
                              fontSize: "1.2 rem",
                              maxWidth: "100%",
                            },
                          }}
                          onChange={(newValue) => {
                            setDateValue(newValue);
                          }}
                          disableCloseOnSelect
                          inputRef={ref}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                )}

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
      <Divider style={{ height: "2rem" }} />
    </Fragment>
  );
}
