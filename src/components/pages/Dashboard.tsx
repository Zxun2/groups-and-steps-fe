import React, { useCallback, useEffect, useState, Fragment } from "react";
import NavBar from "../main/NavBar/NavBar";
import { SideBar } from "../main/SideBar/SideBar";
import { Box, CssBaseline } from "@mui/material";
import { uiAction } from "../../store/ui-slice";
import { fetchAllStep, stepAction } from "../../store/steps-slice";
import Steps from "../main/MainContent/MainContent";
import TodoModal from "../main/Modals/TodoModal";
import UserModal from "../main/Modals/UserModal";
import {
  fetchAllTodos,
  postTodo,
  deleteCurrTodo,
  updateCurrTodo,
} from "../../store/todo-slice";
import { useHttp2 } from "../../hooks/useHttp";
import { useAppDispatch } from "../../hooks/useHooks";
import { NotificationType } from "../../utils/constants";
import { LabelType } from "../../types";

export const Dashboard = () => {
  const dispatch = useAppDispatch();

  // STATE
  const [openUserModal, setOpenUserModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<LabelType[] | []>([]);
  const [activeTodoId, setTodoId] = useState(-1);
  const [updatedTodo, setChange] = useState("");
  const [title, setTitle] = useState("");
  const [Todo, setTodo] = useState("");

  // HTTP REQUESTS
  const { sendRequest: fetchTodos } = useHttp2(fetchAllTodos);
  const { sendRequest: fetchStep } = useHttp2(fetchAllStep);
  const { sendRequest: createTodo } = useHttp2(postTodo);
  const { sendRequest: removeTodo } = useHttp2(deleteCurrTodo);
  const { sendRequest: changeTodo } = useHttp2(updateCurrTodo);

  useEffect(() => {
    fetchTodos({});
  }, [fetchTodos]);

  // Todo Modal
  const openModalHandler = (id: number) => {
    setOpen(true);
    setTodoId(id);
  };

  const handleClose = () => setOpen(false);
  const handleUserClose = () => setOpenUserModal(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Fetch curr Todo steps
  useEffect(() => {
    if (activeTodoId !== -1) {
      fetchStep({ todo_id: activeTodoId });
    }
  }, [activeTodoId, fetchStep, dispatch]);

  const changeContentHandler = useCallback(
    (title: string, id: number) => {
      setTitle(title);
      if (id !== -1) {
        setTodoId(id);
        // Reset filters
        dispatch(
          stepAction.filterStep({
            filterArr: [],
          })
        );
        // Reset filter value
        setValue([]);
      }
    },
    [dispatch]
  );

  const createTodoHandler = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (Todo !== "" && Todo.length <= 15) {
        createTodo({ content: { title: Todo } });
      } else {
        dispatch(
          uiAction.showNotification({
            status: NotificationType.FAIL,
            _title: "Error!",
            message: "Todo must be less than 15 characters",
          })
        );
      }
      setTodo("");
    },
    [Todo, createTodo, dispatch]
  );

  const deleteTodoHandler = useCallback(
    (id: number) => {
      removeTodo({ id });

      // Reset view
      setTodoId(-1);
      setTitle("");
      dispatch(stepAction.resetStepState({}));

      // Close Modal
      setOpen(false);
    },
    [removeTodo, dispatch]
  );

  const updateTodoHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (updatedTodo !== "" && updatedTodo.length <= 15) {
        changeTodo({ id: activeTodoId, content: { title: updatedTodo } });
        setOpen(false);
      } else {
        dispatch(
          uiAction.showNotification({
            status: NotificationType.FAIL,
            _title: "Error!",
            message: "Invalid group title",
          })
        );
      }
    },
    [dispatch, changeTodo, updatedTodo, activeTodoId]
  );

  return (
    <Fragment>
      <TodoModal
        open={open}
        handleClose={handleClose}
        updateTodoChangeHandler={(e) => setChange(e.target.value)}
        updateTodoHandler={updateTodoHandler}
        deleteTodoHandler={deleteTodoHandler}
        todoId={activeTodoId}
      />
      <UserModal open={openUserModal} handleClose={handleUserClose} />
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <NavBar
            handleDrawerToggle={handleDrawerToggle}
            title={title}
            changeContentHandler={changeContentHandler}
          />
          <SideBar
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
            setOpenUserModal={setOpenUserModal}
            changeContentHandler={changeContentHandler}
            openModalHandler={openModalHandler}
            createTodoHandler={createTodoHandler}
            Todo={Todo}
            setTodo={setTodo}
          />
          <Steps
            todoId={activeTodoId}
            title={title}
            value={value}
            setValue={setValue}
          />
        </Box>
      </div>
    </Fragment>
  );
};
