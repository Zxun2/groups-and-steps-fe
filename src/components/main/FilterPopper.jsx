import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
// Returns a hex code for an attractive color
import { v4 } from "uuid";
import {
  StyledPopper,
  PopperComponent,
  StyledInput,
} from "./FilterCustomStyledPopper";

/**
 * FILTER POPPER COMPONENT
 */
const Popper = (props) => {
  return (
    <StyledPopper
      id={props.id}
      open={props.open}
      anchorEl={props.anchorEl}
      placement="bottom-start"
    >
      <ClickAwayListener onClickAway={props.handleClose}>
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
            // If true, value must be an array and the menu will support multiple selections.
            multiple
            // Used to determine if the option represents the given value.
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            onClose={(event, reason) => {
              if (reason === "escape") {
                // handles state transfer (old vs new)
                props.handleClose();
              }
            }}
            value={props.pendingValue}
            style={{ backgroundColor: "#2f3136" }}
            onChange={(event, newValue, reason) => {
              if (
                event.type === "keydown" &&
                event.key === "Backspace" &&
                reason === "removeOption"
              ) {
                return;
              }

              // SET NEW VALUE
              props.setPendingValue(newValue);
            }}
            disableCloseOnSelect
            PopperComponent={PopperComponent}
            noOptionsText="No labels"
            renderOption={(props, option, { selected }) => (
              // Unique key id necessary for React to distinguish the components
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
                  {option.step}
                  <br />
                  <span>{option.tags.join(", ")}</span>
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
            options={[...props.labels].sort((a, b) => {
              // Display the selected labels first.
              let ai = props.value?.findIndex((elem) => a.id === elem.id);
              ai =
                ai === -1
                  ? props.value?.length +
                    props.labels?.findIndex((elem) => a.id === elem.id)
                  : ai;
              let bi = props.value?.findIndex((elem) => b.id === elem.id);
              bi =
                bi === -1
                  ? props.value?.length +
                    props.labels?.findIndex((elem) => b.id === elem.id)
                  : bi;

              // ai < bi iff ai is selected
              return ai - bi;
            })}
            getOptionLabel={(option) =>
              `${option.step} ${option.tags.join(", ")}`
            }
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
  );
};

export default Popper;
