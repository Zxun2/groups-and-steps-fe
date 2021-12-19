import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodoData,
  addTodoData,
  updateTodoData,
  deleteTodoData,
} from "../store/todo-slice";
import CustomScrollbars from "../ui/CustomScollBars";
import { drawerWidth } from "../../actions/constants";
import NavBar from "../main/NavBar";
import { SideBar } from "../main/SideBar";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import { makeStyles, TextField } from "@material-ui/core";
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
import Steps from "../main/Steps";
import { fetchstepsData } from "../store/steps-slice";
import TodoModal from "../main/TodoModal";

const useStyles = makeStyles((theme) => ({
  settings: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export const Dashboard = (props) => {
  const classes = useStyles();
  const userState = useSelector((state) => state.user);
  const TodoState = useSelector((state) => state.todo);

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [addTodo, setAddToDo] = useState("");
  const [change, setChange] = useState("");
  const [todoId, setTodoId] = useState(-1);
  const [mobileOpen, setMobileOpen] = useState(false);

  const Todos = TodoState.Todo;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoData());
  }, [dispatch]);

  const openModalHandler = (id) => {
    setOpen(true);
    setTodoId(id);
  };

  const handleClose = () => setOpen(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeContentHandler = (title, id) => {
    setTitle(title);
    if (id !== -1) {
      setTodoId(id);
      dispatch(fetchstepsData(id));
    }
  };

  const createTodoHandler = (e) => {
    e.preventDefault();
    if (addTodo !== "") {
      dispatch(addTodoData({ title: addTodo }));
    }
  };

  const createTodoChangeHandler = (e) => {
    setAddToDo(e.target.value);
  };

  const deleteTodoHandler = (id) => {
    dispatch(deleteTodoData(id));
    setOpen(false);
  };

  const updateTodoHandler = (e) => {
    e.preventDefault();

    if (change !== "") {
      dispatch(updateTodoData(todoId, { title: change }));
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
  };

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
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={userState?.currUser?.name} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary={userState?.currUser?.email} />
        </ListItem>
      </List>

      <Divider>
        <Chip label="TODO" />
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
        <Chip label="ADD TODO" />
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
          />
        </Box>
      </div>
    </React.Fragment>
  );
};
