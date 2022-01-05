import { createNewStep } from "../../../store/steps-slice";
import { Toolbar, Box } from "@mui/material";
import { uiAction } from "../../../store/ui-slice";
import { FAIL } from "../../../misc/constants";
import { useHttp2 } from "../../../hooks/useHttp";
import { stepStyles } from "../../ui/Style";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useRef } from "react";
import { useState } from "react";
import Landing from "./Landing";
import MainView from "./MainView";
import { getAllTodo } from "../../../store/todo-slice";

const Steps = (props) => {
  const classes = stepStyles();
  const dispatch = useDispatch();

  const stepRef = useRef();

  const [toggleDetails, setToggleDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [view, setView] = useState("Layered");
  const [tags, setTags] = useState([]);

  const { sendRequest: createStep } = useHttp2(createNewStep);
  const Todos = useSelector(getAllTodo);

  const addStepToDatabase = () => {
    if (stepRef.current.value.trim() === "") {
      dispatch(
        uiAction.showNotification({
          status: FAIL,
          title: "Error",
          message: "Step must not be empty!",
        })
      );
    } else {
      createStep({
        content: {
          step: stepRef.current.value.trim(),
          tags: tags,
        },
        todo_id: props.todoId,
      });
    }
    stepRef.current.value = "";
  };

  const addStepHandler = (e) => {
    e.preventDefault();
    addStepToDatabase();
    setSelectedItem([]);
  };

  // Function is called in TagsInput.jsx
  // To return selected tags
  function handleSelectedTags(items) {
    setTags(items);
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: "#2f3136",
        minHeight: "100vh",
      }}
    >
      {(Todos.length === 0 || props.todoId === -1) && (
        <Landing classes={classes} userState={props.userState} />
      )}
      {props.title !== "" && Todos.length !== 0 && (
        <Fragment>
          <Toolbar />
          <MainView
            toggleDetails={toggleDetails}
            setToggleDetails={setToggleDetails}
            todoId={props.todoId}
            view={view}
            setView={setView}
            value={props.value}
            setValue={props.setValue}
            addStepHandler={addStepHandler}
            handleSelectedTags={handleSelectedTags}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            stepRef={stepRef}
          />
        </Fragment>
      )}
    </Box>
  );
};

export default Steps;
