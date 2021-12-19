import * as React from "react";
import PropTypes from "prop-types";
import { useTheme, styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
// Returns a hex code for an attractive color
import randomColor from "randomcolor";
import { v4 } from "uuid";
import { stepsAction } from "../store/steps-slice";
import { useDispatch } from "react-redux";

// Auto Complete Popper
const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: "0",
    borderRadius: "0",
    color: "inherit",
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: "#2f3136",
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: "0.6rem",
      //   borderBottom: `1px solid  ${"#30363d"}`,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

// Custom popper
function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
  anchorEl: PropTypes.any,
  disablePortal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${"#30363d"}`,
  boxShadow: `0 8px 8px ${"#1b1f23"}`,
  borderRadius: "3px",
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: "#c9d1d9",
  backgroundColor: "#1c2128",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  "& input": {
    borderRadius: 4,
    backgroundColor: "#36393f",
    padding: 8,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: `1px solid ${"#30363d"}`,
    fontSize: 14,
    "&:focus": {
      boxShadow: `0px 0px 0px 1px ${"#5865f2"}`,
      borderColor: "#5865f2",
    },
  },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  fontSize: 14,
  width: "100%",
  textAlign: "left",
  paddingBottom: 8,
  color: "#ffffff",
  fontWeight: 600,
  "& span": {
    width: "100%",
  },
  "& svg": {
    width: 16,
    height: 16,
  },
}));

export default function FilterLabel(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pendingValue, setPendingValue] = React.useState([]);
  const [filterArr, setFilterArr] = React.useState([]);

  const theme = useTheme();
  const dispatch = useDispatch();

  let labels = [];
  let idx = -1; // unique identifier
  props?.steps?.map((step, index) => {
    const color = randomColor();
    const tags = step.tags; // array
    let i = idx;
    const data = tags?.map((tag) => {
      i++;
      return { tag, step: step.step, color, id: i, unique_id: step.id };
    });
    idx = i;
    labels = labels.concat(data);
    return step;
  });

  const handleClick = (event) => {
    setPendingValue(props.value);
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        stepsAction.filterStep({
          filterArr: filterArr,
        })
      );
    });

    return () => {
      clearTimeout(timer);
    };
  }, [filterArr, dispatch]);

  const handleClose = () => {
    props.setValue(pendingValue);
    setFilterArr([...new Set(pendingValue.map((filter) => filter.unique_id))]);

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
      <Box sx={{ width: 221, fontSize: 13 }}>
        <Button disableRipple aria-describedby={id} onClick={handleClick}>
          <span>Filter</span>
          <SettingsIcon />
        </Button>
        <Box style={{ "& : lastChild": { marginBottom: "1rem" } }}>
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
              #{label.tag}: {label.step}
            </Box>
          ))}
        </Box>
      </Box>

      {/* POPPER COMPONENT */}
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div style={{ backgroundColor: "#2f3136" }}>
            <Box
              sx={{
                borderBottom: `1px solid ${"#30363d"}`,
                padding: "8px 10px",
                fontWeight: 600,
              }}
            >
              Apply filters to this todo
            </Box>
            <Autocomplete
              open
              // Array of tags
              multiple
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onClose={(event, reason) => {
                if (reason === "escape") {
                  handleClose();
                }
              }}
              value={pendingValue}
              style={{ backgroundColor: "#2f3136" }}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === "keydown" &&
                  event.key === "Backspace" &&
                  reason === "removeOption"
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li {...props} key={v4()}>
                  <Box
                    component={DoneIcon}
                    sx={{
                      width: 17,
                      height: 17,
                      mr: "5px",
                      ml: "-2px",
                    }}
                    style={{
                      visibility: selected ? "visible" : "hidden",
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
                    style={{ backgroundColor: option.color }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      "& span": {
                        color: "#8b949e",
                      },
                    }}
                  >
                    {option.tag}
                    <br />
                    <span>{option.step}</span>
                  </Box>
                  <Box
                    component={CloseIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility: selected ? "visible" : "hidden",
                    }}
                  />
                </li>
              )}
              options={[...labels].sort((a, b) => {
                // Display the selected labels first.
                let ai = props.value.findIndex((elem) => a.id === elem.id);
                ai =
                  ai === -1
                    ? props.value.length +
                      labels.findIndex((elem) => a.id === elem.id)
                    : ai;
                let bi = props.value.findIndex((elem) => b.id === elem.id);
                bi =
                  bi === -1
                    ? props.value.length +
                      labels.findIndex((elem) => b.id === elem.id)
                    : bi;

                // ai < bi iff ai is selected
                return ai - bi;
              })}
              getOptionLabel={(option) => `${option.tag} ${option.step}`}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Filter steps"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  );
}
