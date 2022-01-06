import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import TagIcon from "@mui/icons-material/Tag";
import { Fragment } from "react";
import { Modal, Box } from "@mui/material";
import { useState } from "react";
import CustomScrollbars from "../../ui/CustomScollBars";
import Instructions from "../Inbox/Instructions";
import { navStyles } from "../../../styles/Style";
import { Typography } from "@material-ui/core";
import NavInput from "./NavInput";
import { useSelector } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { drawerWidth } from "../../../misc/constants";
import { getLoadingState } from "../../../store/ui-slice";
import { getAllTodo } from "../../../store/todo-slice";

const NavBar = (props) => {
  const classes = navStyles();
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const status = useSelector(getLoadingState);
  const Todos = useSelector(getAllTodo);

  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <AppBar
        elevation={2}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#36393f",
        }}
      >
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ alignItems: "center", display: "flex" }}
            >
              <TagIcon />
              {props.title === "" || Todos.length === 0
                ? "Welcome"
                : props.title}
            </Typography>
            <div className={classes.group}>
              <NavInput
                Todos={Todos}
                changeContentHandler={props.changeContentHandler}
              />
              <InboxIcon onClick={handleOpen} className={classes.inboxIcon} />
              <Modal keepMounted open={open} onClose={handleClose}>
                <Box className={classes.style}>
                  <CustomScrollbars
                    style={{
                      height: "55vh",
                    }}
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                  >
                    <Instructions />
                  </CustomScrollbars>
                </Box>
              </Modal>
            </div>
          </Box>
        </Toolbar>
        {status === true && <LinearProgress color="primary" />}
      </AppBar>
    </Fragment>
  );
};

export default NavBar;
