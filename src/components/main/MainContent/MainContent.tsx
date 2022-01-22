import { createNewStep } from "../../../store/steps-slice";
import { Toolbar, Box } from "@mui/material";
import { uiAction } from "../../../store/ui-slice";
import { NotificationType } from "../../../utils/constants";
import { useHttp2 } from "../../../hooks/useHttp";
import { Fragment, useRef } from "react";
import { useState } from "react";
import Landing from "./Landing";
import MainView from "./MainView";
import { getAllTodo } from "../../../store/todo-slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/useHooks";
import { LabelType } from "../../../types";

type StepsProps = {
  todoId: number;
  title: string;
  value: LabelType[];
  setValue: React.Dispatch<React.SetStateAction<LabelType[]>>;
};

const Steps: React.FC<StepsProps> = (props) => {
  const dispatch = useAppDispatch();

  const stepRef = useRef<HTMLInputElement>();

  const [toggleDetails, setToggleDetails] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string[] | []>([]);
  const [view, setView] = useState("Layered");
  const [tags, setTags] = useState<string[] | []>([]);

  const { sendRequest: createStep } = useHttp2(createNewStep);
  const Todos = useAppSelector(getAllTodo);

  const addStepToDatabase = () => {
    if (stepRef.current!.value.trim() === "") {
      dispatch(
        uiAction.showNotification({
          status: NotificationType.FAIL,
          _title: "Error",
          message: "Step must not be empty!",
        })
      );
    } else {
      createStep({
        content: {
          step: stepRef.current!.value.trim(),
          tags: tags,
        },
        todo_id: props.todoId,
      });
    }
    stepRef.current!.value = "";
  };

  const addStepHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    addStepToDatabase();
    setSelectedItem([]);
  };

  // Function is called in TagsInput.jsx to return selected tags
  function handleSelectedTags(items: string[]) {
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
      {(Todos.length === 0 || props.todoId === -1) && <Landing />}
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
