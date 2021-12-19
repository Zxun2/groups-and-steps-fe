import { makeStyles } from "@material-ui/core";
import { alpha } from "@mui/material/styles";

export const navStyles = makeStyles((theme) => ({
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
    width: "15vw",
  },
  inboxIcon: {
    marginLeft: "1rem",
    "& :hover": {
      color: theme.palette.primary.main,
    },
  },
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: theme.palette.background.tertiary,
    boxShadow: 24,
    borderRadius: "4px",
    p: 4,
  },
}));
