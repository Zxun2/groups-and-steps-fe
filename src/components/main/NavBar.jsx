import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import TagIcon from "@mui/icons-material/Tag";
import { Fragment } from "react";
import { Modal, Box } from "@mui/material";
import { useState } from "react";
import CustomizedTimeline from "./Timeline";
import CustomScrollbars from "../ui/CustomScollBars";
import Instructions from "./Instructions";
import { navStyles } from "../ui/Style";
import { Typography } from "@material-ui/core";
import NavInput from "./NavInput";

const NavBar = (props) => {
  const classes = navStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${props.drawerWidth}px)` },
          ml: { sm: `${props.drawerWidth}px` },
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
              <TagIcon />{" "}
              {props.title === "" || props.todos.length === 0
                ? "Welcome"
                : props.title}
            </Typography>
            <div className={classes.group}>
              <NavInput
                Todos={props.todos}
                changeContentHandler={props.changeContentHandler}
              />
              <InboxIcon onClick={handleOpen} className={classes.inboxIcon} />
              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box className={classes.style}>
                  <CustomScrollbars
                    style={{ height: "55vh" }}
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                  >
                    <CustomizedTimeline />

                    <Instructions />
                  </CustomScrollbars>
                </Box>
              </Modal>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default NavBar;
