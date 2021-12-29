import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawerWidth } from "../../misc/constants";
import NavBar from "../main/NavBar/NavBar";
import { SideBar } from "../main/SideBar/SideBar";
import { Box, CssBaseline } from "@mui/material";
import { uiAction } from "../store/ui-slice";
import { stepAction } from "../store/steps-slice";
import Steps from "../main/MainContent/Steps";
import TodoModal from "../main/Modals/TodoModal";
import UserModal from "../main/Modals/UserModal";
import {
  addTodo,
  deleteTodo,
  fetchData,
  fetchSteps,
  updateTodo,
} from "../lib/api";
import useHttp from "../hooks/useHttp";

export const Dashboard = (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const TodoState = useSelector((state) => state.todo);

  // STATE
  const [openUserModal, setOpenUserModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [activeTodoId, setTodoId] = useState(-1);
  const [updatedTodo, setChange] = useState("");
  const [title, setTitle] = useState("");
  const [Todo, setTodo] = useState("");

  // HTTP REQUESTS
  const { sendRequest: fetchTodos } = useHttp(fetchData);
  const { sendRequest: fetchStep } = useHttp(fetchSteps, true);
  const { sendRequest: createTodo } = useHttp(addTodo);
  const { sendRequest: removeTodo } = useHttp(deleteTodo);
  const { sendRequest: changeTodo } = useHttp(updateTodo);

  const Todos = TodoState.Todo;

  // Fetch Todos
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTodos();
    });

    return () => {
      clearTimeout(timer);
    };
  }, [fetchTodos]);

  // Todo Modal
  const openModalHandler = (id) => {
    setOpen(true);
    setTodoId(id);
  };

  // Todo Modal close
  const handleClose = () => setOpen(false);
  // User Modal close
  const handleUserClose = () => setOpenUserModal(false);

  // Drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Fetch curr Todo steps
  useEffect(() => {
    if (activeTodoId !== -1) {
      fetchStep(activeTodoId);
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

  // Create Todo
  const createTodoHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (Todo !== "") {
        createTodo({ title: Todo });
      }
      setTodo("");
    },
    [Todo, createTodo]
  );

  // Delete Todo
  const deleteTodoHandler = useCallback(
    (id) => {
      setTimeout(() => removeTodo(id), 0);
      // Close Modal
      setOpen(false);
    },
    [removeTodo]
  );

  const updateTodoHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (updatedTodo !== "") {
        setTimeout(() => changeTodo(activeTodoId, { title: updatedTodo }), 0);
        setOpen(false);
      } else {
        dispatch(
          uiAction.showNotification({
            status: "error",
            title: "Error!",
            message: "Todo title must not be empty",
          })
        );
      }
    },
    [dispatch, changeTodo, updatedTodo, activeTodoId]
  );

  return (
    <React.Fragment>
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
            todos={Todos}
            changeContentHandler={changeContentHandler}
          />
          <SideBar
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
            setOpenUserModal={setOpenUserModal}
            userState={userState}
            Todos={Todos}
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
            Todos={Todos}
            value={value}
            setValue={setValue}
          />
        </Box>
      </div>
    </React.Fragment>
  );
};
