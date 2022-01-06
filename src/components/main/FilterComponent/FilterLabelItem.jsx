import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@material-ui/core";

const FilterLabelItem = (props) => {
  return (
    <>
      <Box
        component={DoneIcon}
        sx={{
          width: 17,
          height: 17,
          mr: "5px",
          ml: "-2px",
        }}
        style={{
          visibility: props.selected ? "visible" : "hidden",
        }}
      />
      <Box
        component="span"
        sx={{
          width: 14,
          height: 14,
          flexShrink: 0,
          borderRadius: "3px",
          mr: 1,
          mt: "2px",
        }}
        style={{ backgroundColor: props.option.color }}
      />
      <Box
        sx={{
          flexGrow: 1,
          "& span": {
            color: "#8b949e",
          },
        }}
      >
        {props.option.step}
        <br />
        <span>{props.option.tags.join(", ")}</span>
      </Box>
      <Box
        component={CloseIcon}
        sx={{ opacity: 0.6, width: 18, height: 18 }}
        style={{
          visibility: props.selected ? "visible" : "hidden",
        }}
      />
    </>
  );
};

export default FilterLabelItem;
