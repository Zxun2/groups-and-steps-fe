import ClickAwayListener from "@mui/material/ClickAwayListener";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import * as React from "react";
import { v4 } from "uuid";
import {
  StyledPopper,
  PopperComponent,
  StyledInput,
} from "./FilterCustomStyledPopper";
import FilterLabelItem from "./FilterLabelItem";
import { LabelType } from "../../../store/steps-slice";

/**
 * FILTER POPPER COMPONENT
 */
interface PopperProps {
  id: "Todo-tags" | undefined;
  open: boolean;
  anchorEl?: any;
  handleClose: () => void;
  pendingValue: LabelType[];
  setPendingValue: React.Dispatch<React.SetStateAction<LabelType[]>>;
  labels: LabelType[];
  value: LabelType[];
}

const Popper = (props: PopperProps) => {
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
            Apply filters to this group
          </Box>
          <Autocomplete
            open
            // If true, value must be an array and the menu will support multiple selections.
            multiple
            // Used to determine if the option represents the given value.
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            onClose={(_, reason) => {
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
                (event as React.KeyboardEvent).key === "Backspace" &&
                reason === "removeOption"
              ) {
                return;
              }
              // newValue is the newPendingValue
              // SET NEW VALUE
              props.setPendingValue(newValue);
            }}
            disableCloseOnSelect
            PopperComponent={PopperComponent}
            noOptionsText="No labels"
            ListboxProps={{
              // @ts-ignore
              sx: {
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  // Width of scrollbar
                  width: "0.4rem",
                },
                "&::-webkit-scrollbar-track": {
                  // Color of track
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: 6,
                  background: "#5865f2",
                },
              },
            }}
            renderOption={(props, option, { selected }) => (
              // Unique key id necessary for React to distinguish the components
              <li {...props} key={v4()}>
                <FilterLabelItem option={option} selected={selected} />
              </li>
            )}
            options={[...props.labels].sort((a, b) => {
              // Display the selected labels first.
              let ai = props?.value?.findIndex(
                (elem: LabelType) => a.id === elem.id
              );
              ai =
                ai === -1
                  ? props?.value?.length +
                    props.labels.findIndex(
                      (elem: LabelType) => a.id === elem.id
                    )
                  : ai;
              let bi = props?.value?.findIndex(
                (elem: LabelType) => b.id === elem.id
              );
              bi =
                bi === -1
                  ? props?.value?.length +
                    props?.labels?.findIndex((elem) => b.id === elem.id)
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
