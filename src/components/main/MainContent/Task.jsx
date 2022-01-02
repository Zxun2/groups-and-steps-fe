import { Typography, TextField, CardHeader } from "@material-ui/core";
import React, { Fragment, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import randomColor from "randomcolor";
import { Chip } from "@material-ui/core";
import { useHttp2 } from "../../../hooks/useHttp";
import TagsInput from "../tag/tags-input";
import { tagInputStyles } from "../../ui/Style";
import { updateCurrStep, deleteCurrStep } from "../../../store/steps-slice";

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

export default function Task({
  updated_at,
  id: step_id,
  step,
  completed,
  todo_id,
  tags,
  ...others
}) {
  const classes = tagInputStyles();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [newTags, setNewTags] = useState(tags);

  const inputRef = useRef();

  const { sendRequest: updateStep } = useHttp2(updateCurrStep);
  const { sendRequest: deleteStep } = useHttp2(deleteCurrStep);

  const open = Boolean(anchorEl);

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

    updateStep({
      todo_id,
      step_id,
      content: {
        step: inputRef.current.value,
        tags: newTags,
      },
    });

    setExpanded(!expanded);
  };

  const deleteStepHandler = () => {
    deleteStep({ todo_id, step_id });

    setExpanded(!expanded);
  };

  const date = new Date(updated_at).toDateString();

  return (
    <Fragment>
      {/* EXPLORE GRID HERE */}
      <Card sx={{ maxWidth: "100%", backgroundColor: "#2f3136" }}>
        <CardHeader
          action={
            <Fragment>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon style={{ color: "#ffffff" }} />
              </IconButton>
              <Menu
                color="primary"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
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
        {/* Explore how to add markdown content here */}
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
        </CardContent>
        <CardActions disableSpacing={true} style={{ paddingBottom: "0" }}>
          {/* BUG: LIMIT WIDTH */}
          <Box className={classes.scrollbar}>
            {tags?.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                style={{
                  paddingLeft: "0.5rem",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {/* TAGS ARE RENDERED HERE */}
                <Typography color="secondary" variant="body2">
                  Tags:
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
          </Box>
          {/* STYLED COMPONENT USED HERE */}
          <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
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
      <Divider style={{ height: "2rem" }} />
    </Fragment>
  );
}
