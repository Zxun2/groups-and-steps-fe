import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { drawerWidth } from "../../../misc/constants";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CustomScrollbars from "../../ui/CustomScollBars";
import TagIcon from "@mui/icons-material/Tag";
import SettingsIcon from "@mui/icons-material/Settings";
import { dashboardStyles } from "../../ui/Style";
import { TextField } from "@material-ui/core";
import {
  Chip,
  Toolbar,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  Divider,
} from "@mui/material";

export const SideBar = (props) => {
  const { window } = props;
  const classes = dashboardStyles();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Toolbar />
      <Divider>
        <Chip label="USER" />
      </Divider>
      <List>
        <ListItem button onClick={() => props.setOpenUserModal(true)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={props.userState?.currUser?.name} />
        </ListItem>
        <ListItem button onClick={() => props.setOpenUserModal(true)}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary={props.userState?.currUser?.email} />
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
          {props.Todos.map((Todo) => (
            <ListItem
              button
              onClick={props.changeContentHandler.bind(
                null,
                Todo.title,
                Todo.id
              )}
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
                  onClick={props.openModalHandler.bind(null, Todo.id)}
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
          value={props.Todo}
          onChange={(e) => props.setTodo(e.target.value)}
          onSubmit={props.createTodoHandler}
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
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            height: "100vh",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            height: "100vh",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
