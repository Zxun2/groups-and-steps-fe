import * as React from "react";
import { useTheme } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
// Returns a hex code for an attractive color
import randomColor from "randomcolor";
import { stepAction } from "../../store/steps-slice";
import { useDispatch } from "react-redux";
import { Button } from "./FilterCustomStyledPopper";
import Popper from "./FilterPopper";

/**
 * FILTER COMPONENT
 */
export default function FilterLabel(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // "NEW" FILTERS
  const [pendingValue, setPendingValue] = React.useState([]);
  const [filterArr, setFilterArr] = React.useState([]);

  const theme = useTheme();
  const dispatch = useDispatch();

  // Reformat steps into desirable format for filter
  let labels = [];

  const data = props?.steps?.map((step, index) => {
    const color = randomColor();
    const tags = step.tags; // array
    return {
      tags: [...tags],
      step: step.step,
      color,
      id: step.id,
    };
  });

  labels = labels.concat(data);

  const handleClick = (event) => {
    setPendingValue(props.value);
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    // on mount
    const timer = setTimeout(() => {
      dispatch(
        stepAction.filterStep({
          filterArr: filterArr,
        })
      );
    });

    return () => {
      clearTimeout(timer);
    };
  }, [filterArr, dispatch]);

  const handleClose = () => {
    // transfer to new state
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
          {props.value.map((label) => (
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
