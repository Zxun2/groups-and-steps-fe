import { makeStyles } from "@material-ui/core";
import { AppBar, Box, Typography, Toolbar, InputBase } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import InboxIcon from "@mui/icons-material/Inbox";

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
    background: theme.palette.background.tertiary,
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.appBar} position="static" elevation={0}>
        <Toolbar className={classes.toolBar}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            # general
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
    </Box>
  );
};

export default NavBar;
