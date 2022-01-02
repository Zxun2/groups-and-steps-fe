import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GridViewIcon from "@mui/icons-material/GridView";
import { styled, alpha } from "@mui/material/styles";
import LayersIcon from "@mui/icons-material/Layers";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Button } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import * as React from "react";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: "200",
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

// Can use enum here
export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeViewHandler = (view) => {
    props.setView(view);
    handleClose();
  };
  const toggleDetails = () => {
    props.setToggleDetails(!props.toggleDetails);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={{
          maxWidth: "220px",
          color: "white",
          backgroundColor: "#2f3136",
        }}
      >
        Advanced Options
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={changeViewHandler.bind(null, "Grid")} disableRipple>
          <GridViewIcon />
          Grid View
        </MenuItem>
        <MenuItem
          onClick={changeViewHandler.bind(null, "Layered")}
          disableRipple
        >
          <LayersIcon />
          Layered View
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={toggleDetails} disableRipple>
          <MoreHorizIcon />
          {props.toggleDetails ? "Close" : "More"}
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
