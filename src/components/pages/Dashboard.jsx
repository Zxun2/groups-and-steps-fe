import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { TodoCreators } from "../store/todo-slice";
import CustomScrollbars from "../ui/CustomScollBars";
import { drawerWidth } from "../../actions/constants";
import NavBar from "../main/NavBar/NavBar";
import { SideBar } from "../main/SideBar/SideBar";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import { TextField } from "@material-ui/core";
import {
  Chip,
  Toolbar,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  Box,
  Divider,
  CssBaseline,
} from "@mui/material";
import { uiAction } from "../store/ui-slice";
// StepCreators,
import { stepsAction } from "../store/steps-slice";
import Steps from "../main/MainContent/Steps";
import TodoModal from "../main/Modals/TodoModal";
import { dashboardStyles } from "../ui/Style";
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
  const classes = dashboardStyles();
  const userState = useSelector((state) => state.user);
  const TodoState = useSelector((state) => state.todo);

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [Todo, setTodo] = useState("");
  const [change, setChange] = useState("");
  const [todoId, setTodoId] = useState(-1);
  const [value, setValue] = React.useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  // HTTP REQUESTS
  const { sendRequest: fetchTodos } = useHttp(fetchData);
  const { sendRequest: fetchStep } = useHttp(fetchSteps, true);
  const { sendRequest: createTodo } = useHttp(addTodo);
  const { sendRequest: removeTodo } = useHttp(deleteTodo);
  const { sendRequest: changeTodo } = useHttp(updateTodo);

  const Todos = TodoState.Todo;
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTodos();
    });

    return () => {
      clearTimeout(timer);
    };
  }, [fetchTodos]);

  const openModalHandler = (id) => {
    setOpen(true);
    setTodoId(id);
  };

  const handleClose = () => setOpen(false);
  const handleUserClose = () => setOpenUserModal(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (todoId !== -1) {
      fetchStep(todoId);
    }
  }, [todoId, fetchStep, dispatch]);

  const changeContentHandler = useCallback(
    (title, id) => {
      setTitle(title);
      if (id !== -1) {
        setTodoId(id);

        dispatch(
          stepsAction.filterStep({
            filterArr: [],
          })
        );
        setValue([]);
      }
    },
    [dispatch]
  );

  const createTodoHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (Todo !== "") {
        setTimeout(() => createTodo({ title: Todo }), 0);
      }

      setTodo("");
    },
    [Todo, createTodo]
  );

  const createTodoChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const deleteTodoHandler = useCallback(
    (id) => {
      setTimeout(() => removeTodo(id), 0);
      setOpen(false);
    },
    [removeTodo]
  );

  const updateTodoHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (change !== "") {
        setTimeout(() => changeTodo(todoId, { title: change }), 0);
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
    [dispatch, changeTodo, change, todoId]
  );

  const updateTodoChangeHandler = (e) => {
    setChange(e.target.value);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider>
        <Chip label="USER" />
      </Divider>
      <List>
        <ListItem button onClick={() => setOpenUserModal(true)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={userState?.currUser?.name} />
        </ListItem>
        <ListItem button onClick={() => setOpenUserModal(true)}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary={userState?.currUser?.email} />
        </ListItem>
      </List>

      <Divider>
        <Chip label="GROUP" />
      </Divider>
      <CustomScrollbars
        style={{ height: "60vh" }}
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
      >
        <List>
          {Todos.map((Todo) => (
            <ListItem
              button
              onClick={changeContentHandler.bind(null, Todo.title, Todo.id)}
              key={Todo.id}
            >
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              <ListItemText primary={Todo.title} />
              <ListItemIcon
                style={{
                  justifyContent: "end",
                  fontSize: "10px",
                  " & .MuiListItemIconRoot": {
                    minWidth: "38px",
                  },
                }}
              >
                <SettingsIcon
                  className={classes.settings}
                  onClick={openModalHandler.bind(null, Todo.id)}
                  fontSize="small"
                />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </CustomScrollbars>
      <Divider>
        <Chip label="ADD GROUP" />
      </Divider>
      <List>
        <TextField
          style={{ margin: "2rem 0 0 1rem" }}
          component="form"
          size="medium"
          onChange={createTodoChangeHandler}
          onSubmit={createTodoHandler}
          placeholder="Add group"
          variant="standard"
          InputProps={{
            color: "primary",
            style: { color: "black", fontSize: "1.1rem" },
          }}
        />
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <TodoModal
        open={open}
        handleClose={handleClose}
        updateTodoChangeHandler={updateTodoChangeHandler}
        updateTodoHandler={updateTodoHandler}
        deleteTodoHandler={deleteTodoHandler}
        todoId={todoId}
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
            drawer={drawer}
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
          />
          <Steps
            todoId={todoId}
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
