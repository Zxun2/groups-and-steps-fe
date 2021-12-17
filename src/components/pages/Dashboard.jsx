import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoData, addTodoData } from "../store/todo-slice";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TagIcon from "@mui/icons-material/Tag";
import Toolbar from "@mui/material/Toolbar";
import NavBar from "../main/NavBar";
import { SideBar } from "../main/SideBar";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { TextField } from "@mui/material";
import { Typography } from "@material-ui/core";
import AppIcon from "../svgs/AppIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomScrollbars from "../ui/CustomScollBars";
import { drawerWidth } from "../../actions/constants";

export const Dashboard = (props) => {
  const userState = useSelector((state) => state.user);
  const TodoState = useSelector((state) => state.todo);
  const Todos = TodoState.Todo;
  const [title, setTitle] = useState("");
  const [addTodo, setAddToDo] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoData());
  }, [dispatch]);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeTitleHandler = (title) => {
    setTitle(title);
  };

  const createTodoHandler = (e) => {
    e.preventDefault();
    if (addTodo !== "") {
      dispatch(addTodoData({ title: addTodo }));
    }
  };

  const AddTodoChangeHandler = (e) => {
    setAddToDo(e.target.value);
  };

  const drawer = (
    <div>
      <Toolbar />
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

      <Divider />
      <CustomScrollbars
        style={{ height: "70vh" }}
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
      >
        <List>
          {Todos.map((Todo, index) => (
            <ListItem
              button
              onClick={changeTitleHandler.bind(null, Todo.title)}
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
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </CustomScrollbars>
      <Divider />
      <List>
        <TextField
          style={{ margin: "2rem 0 0 1rem" }}
          component="form"
          color="primary"
          size="normal"
          onChange={AddTodoChangeHandler}
          onSubmit={createTodoHandler}
          defaultValue="Add group"
          variant="standard"
        />
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <NavBar
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
            title={title}
          />
          <SideBar
            drawer={drawer}
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
          />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              backgroundColor: "#2f3136",
              height: "100vh",
            }}
          >
            {title === "" && (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  color="secondary"
                  style={{ fontWeight: "600", display: "inline" }}
                >
                  Welcome{" "}
                  <span style={{ color: "#5865f2" }}>
                    {userState?.currUser?.name}
                  </span>
                  ,
                </Typography>

                <Typography
                  variant="h4"
                  color="secondary"
                  style={{ fontWeight: "600" }}
                >
                  Create/Select a group to get started!
                </Typography>
                <AppIcon />
              </Box>
            )}
            {title !== "" && <Toolbar />}
          </Box>
        </Box>
      </div>
    </React.Fragment>
  );
};
