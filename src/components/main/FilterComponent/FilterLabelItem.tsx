import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@material-ui/core";
import { LabelType } from "../../../store/steps-slice";

interface FilterLabelItemProps {
  option: LabelType;
  selected: boolean;
}

const FilterLabelItem = (props: FilterLabelItemProps) => {
  return (
    <>
      <Box
        component={DoneIcon}
        style={{
          width: 17,
          height: 17,
          marginRight: "5px",
          marginLeft: "-2px",
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
        style={{
          flexGrow: 1,
          // @ts-ignore
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
        style={{
          opacity: "0.6",
          width: 18,
          height: 18,
          visibility: props.selected ? "visible" : "hidden",
        }}
      />
    </>
  );
};

export default FilterLabelItem;
