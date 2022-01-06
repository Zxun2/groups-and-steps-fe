import React, { Fragment } from "react";
import { CardHeader } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TaskHeader = ({
  open,
  setAnchorEl,
  handleClose,
  completed,
  date,
  anchorEl,
}) => {
  return (
    <CardHeader
      action={
        <Fragment>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon style={{ color: "#ffffff" }} />
          </IconButton>
          <Menu
            color="primary"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleClose}>
              {completed ? "Uncomplete Task" : "Complete task"}
            </MenuItem>
          </Menu>
        </Fragment>
      }
      title={date}
      titleTypographyProps={{ variant: "body2", color: "secondary" }}
      style={{ paddingBottom: "0" }}
    />
  );
};

export default TaskHeader;
