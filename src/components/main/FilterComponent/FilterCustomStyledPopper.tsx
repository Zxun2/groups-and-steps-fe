import { autocompleteClasses } from "@mui/material/Autocomplete";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

// Auto Complete Popper
export const StyledAutocompletePopper = styled("div")(({ theme }) => ({
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
export const PopperComponent = (props: PopperComponentProps) => {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
};

export const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${"#30363d"}`,
  boxShadow: `0 8px 8px ${"#1b1f23"}`,
  borderRadius: "3px",
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: "#c9d1d9",
  backgroundColor: "#1c2128",
}));

export const StyledInput = styled(InputBase)(({ theme }) => ({
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

export const Button = styled(ButtonBase)(({ theme }) => ({
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
