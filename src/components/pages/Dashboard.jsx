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
import DeleteIcon from "@mui/icons-material/Delete";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import { makeStyles, Typography } from "@material-ui/core";
import {
  Chip,
  Button,
  Modal,
  TextField,
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

const useStyles = makeStyles((theme) => ({
  settings: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: theme.palette.background.tertiary,
    boxShadow: 24,
    borderRadius: "4px",
    p: 4,
    padding: "4rem",
  },
  input: {
    "& .MuiFilledInputInput": {
      color: theme.palette.secondary.main,
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
  const [id, setId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const Todos = TodoState.Todo;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoData());
  }, [dispatch]);

  const openModalHandler = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => setOpen(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeContentHandler = (title, id) => {
    setTitle(title);
    setId(id);
    dispatch(fetchstepsData(id));
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
      dispatch(updateTodoData(id, { title: change }));
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
          color="primary"
          size="normal"
          onChange={createTodoChangeHandler}
          onSubmit={createTodoHandler}
          defaultValue="Add group"
          variant="standard"
        />
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modal}>
          <Typography
            style={{ fontWeight: "600", textAlign: "center", margin: "1rem" }}
            variant="h5"
            color="secondary"
          >
            Change your title
          </Typography>
          <Typography
            style={{ fontWeight: "400", textAlign: "center", color: "#cccccc" }}
            variant="subtitle1"
          >
            Enter your new title below or click the delete button to delete
            Todo.
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "revert",
              margin: "2rem",
            }}
          >
            <TextField
              id="title"
              component="form"
              className={classes.input}
              color="secondary"
              size="large"
              onChange={updateTodoChangeHandler}
              onSubmit={updateTodoHandler}
              variant="filled"
            />

            <Button
              variant="outlined"
              color="error"
              style={{ marginTop: "2rem" }}
              startIcon={<DeleteIcon />}
              onClick={deleteTodoHandler.bind(null, id)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <NavBar
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
            title={title}
            todos={Todos}
          />
          <SideBar
            drawer={drawer}
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
          />

          <Steps id={id} title={title} userState={userState} Todos={Todos} />
        </Box>
      </div>
    </React.Fragment>
  );
};
