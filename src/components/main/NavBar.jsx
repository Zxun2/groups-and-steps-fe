import { makeStyles } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import TagIcon from "@mui/icons-material/Tag";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchBar: {
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: "3em",
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  },
  searchIconWrapper: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  appBar: {
    background: theme.palette.background.primary,
    "& > .MuiPaper-elevation4": {
      boxShadow: "10px",
    },
  },
  toolBar: {
    justifyContent: "space-between",
  },
  group: {
    display: "flex",
    alignItems: "center",
    " & :nth-child(1) ": {
      marginRight: "2rem",
    },
  },
  inboxIcon: {
    "& :hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const NavBar = (props) => {
  const classes = useStyles();

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
            <div className={classes.search}>
              <div className={classes.searchIconWrapper}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                className={classes.searchBar}
              />
            </div>

            <InboxIcon className={classes.inboxIcon} />
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default NavBar;
