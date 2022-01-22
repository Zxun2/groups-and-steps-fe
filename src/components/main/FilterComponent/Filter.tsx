import SettingsIcon from "@mui/icons-material/Settings";
import { getFilterLabels, stepAction } from "../../../store/steps-slice";
import { Button } from "./FilterCustomStyledPopper";
import { useTheme } from "@mui/material/styles";
import Popper from "./FilterPopper";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useHooks";
import { LabelType } from "../../../types";

type FilterLabelProps = {
  value: LabelType[];
  setValue: React.Dispatch<React.SetStateAction<LabelType[]>>;
};

export default function FilterLabel(props: FilterLabelProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // "NEW" FILTERS
  const [pendingValue, setPendingValue] = useState<LabelType[]>([]);
  const [filterArr, setFilterArr] = useState<number[] | []>([]);

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const data = useAppSelector(getFilterLabels);

  // Reformat steps into desirable format for filter
  let labels: LabelType[] = data;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // initially an empty arr - means dont select anything on start
    setPendingValue(props.value || []);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    // on mount
    dispatch(
      stepAction.filterStep({
        filterArr,
      })
    );
  }, [filterArr, dispatch]);

  const handleClose = () => {
    // transfer currState to newState
    props.setValue(pendingValue);

    // for rendering of ui (remove duplicates)
    setFilterArr([...new Set(pendingValue.map((filter) => filter.id))]);

    // Focus on label
    if (anchorEl) {
      anchorEl.focus();
    }

    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "Todo-tags" : undefined;

  return (
    <React.Fragment>
      <Box sx={{ width: 220, fontSize: 13, p: "0 1rem 0 1rem" }}>
        <Button disableRipple onClick={handleClick}>
          <span>Filter</span>
          <SettingsIcon />
        </Button>
        <Box>
          {props?.value?.map((label: LabelType) => (
            <Box
              key={label.id}
              sx={{
                mt: "3px",
                height: "auto",
                padding: ".15em 4px",
                fontWeight: 600,
                lineHeight: "15px",
                borderRadius: "2px",
              }}
              style={{
                backgroundColor: label.color,
                color: theme.palette.getContrastText(label.color),
              }}
            >
              {label.step.length > 50
                ? `${label.step.slice(0, 50)}...`
                : label.step}
            </Box>
          ))}
        </Box>
      </Box>

      {/* POPPER COMPONENT */}
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        pendingValue={pendingValue}
        setPendingValue={setPendingValue}
        labels={labels}
        value={props.value}
      />
    </React.Fragment>
  );
}
