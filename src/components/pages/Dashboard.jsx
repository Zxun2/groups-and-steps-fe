import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoData } from "../store/todo-slice";
import { uiAction } from "../store/ui-slice";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TagIcon from "@mui/icons-material/Tag";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavBar from "../main/NavBar";
import { SideBar } from "../main/SideBar";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
const drawerWidth = 240;

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
    console.log(addTodo);
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
      <List>
        {Todos.map((Todo, index) => (
          <ListItem
            button
            onClick={changeTitleHandler.bind(null, Todo.title)}
            autoFocus={index === 0 ? true : false}
            key={Todo.id}
          >
            <ListItemIcon>
              <TagIcon />
            </ListItemIcon>
            <ListItemText primary={Todo.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {/* <ListItem button> */}
        {/* <ListItemText primary={"Add a new Todo"} />
          <ListItemIcon>
            <AddIcon color="primary" />
          </ListItemIcon> */}
        {/* </ListItem> */}
        <TextField
          style={{ margin: "2rem 0 0 1rem" }}
          component="form"
          color="primary"
          size="normal"
          onChange={AddTodoChangeHandler}
          onSubmit={createTodoHandler}
          defaultValue="Add todo"
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
            <Toolbar />
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          </Box>
        </Box>
      </div>
    </React.Fragment>
  );
};
