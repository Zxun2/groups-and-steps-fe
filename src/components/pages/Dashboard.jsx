import React, { useCallback, useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawerWidth } from "../../misc/constants";
import NavBar from "../main/NavBar/NavBar";
import { SideBar } from "../main/SideBar/SideBar";
import { Box, CssBaseline } from "@mui/material";
import { uiAction } from "../../store/ui-slice";
import { fetchAllStep, stepAction } from "../../store/steps-slice";
import Steps from "../main/MainContent/Steps";
import TodoModal from "../main/Modals/TodoModal";
import UserModal from "../main/Modals/UserModal";
import {
  fetchAllTodos,
  postTodo,
  deleteCurrTodo,
  updateCurrTodo,
} from "../../store/todo-slice";

import { useHttp2 } from "../../hooks/useHttp";
import { getUserState } from "../../store/user-slice";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const userState = useSelector(getUserState);

  // STATE
  const [openUserModal, setOpenUserModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
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
  const openModalHandler = (id) => {
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
      fetchStep({ id: activeTodoId });
    }
  }, [activeTodoId, fetchStep, dispatch]);

  const changeContentHandler = useCallback(
    (title, id) => {
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
    (e) => {
      e.preventDefault();
      if (Todo !== "") {
        createTodo({ content: { title: Todo } });
      }
      setTodo("");
    },
    [Todo, createTodo]
  );

  const deleteTodoHandler = useCallback(
    (id) => {
      removeTodo({ id });

      // Reset view
      setTodoId(-1);
      setTitle("");
      dispatch(stepAction.resetStepState());

      // Close Modal
      setOpen(false);
    },
    [removeTodo, dispatch]
  );

  const updateTodoHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (updatedTodo !== "") {
        changeTodo({ id: activeTodoId, content: { title: updatedTodo } });
        setOpen(false);
      } else {
        dispatch(
          uiAction.showNotification({
            status: "error",
            _title: "Error!",
            message: "Todo title must not be empty",
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
            drawerWidth={drawerWidth}
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
            userState={userState}
            value={value}
            setValue={setValue}
          />
        </Box>
      </div>
    </Fragment>
  );
};
