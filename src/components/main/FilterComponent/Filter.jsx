import SettingsIcon from "@mui/icons-material/Settings";
import { getFilterLabels, stepAction } from "../../../store/steps-slice";
import { Button } from "./FilterCustomStyledPopper";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Popper from "./FilterPopper";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";

/**
 * FILTER COMPONENT
 */
export default function FilterLabel(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  // "NEW" FILTERS
  const [pendingValue, setPendingValue] = useState([]);
  const [filterArr, setFilterArr] = useState([]);

  const theme = useTheme();
  const dispatch = useDispatch();

  const data = useSelector(getFilterLabels);

  // Reformat steps into desirable format for filter
  let labels = [];
  labels = labels.concat(data);

  const handleClick = (event) => {
    setPendingValue(props.value || []); // initially an empty arr - means dont select anything on start
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    // on mount
    dispatch(
      stepAction.filterStep({
        filterArr: filterArr,
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
      <Box sx={{ width: 220, fontSize: 13 }}>
        <Button disableRipple onClick={handleClick}>
          <span>Filter</span>
          <SettingsIcon />
        </Button>
        <Box style={{ "&:lastChild": { marginBottom: "2rem" } }}>
          {props?.value?.map((label) => (
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
