import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GridViewIcon from "@mui/icons-material/GridView";
import LayersIcon from "@mui/icons-material/Layers";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Button } from "@material-ui/core";
import StyledMenu from "./ViewSelectStyledComponents";
import * as React from "react";

type SelectLabelsProps = {
  toggleDetails: boolean;
  setToggleDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setView: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectLabels(props: SelectLabelsProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeViewHandler = (view: string) => {
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
