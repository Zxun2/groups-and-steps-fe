import { styled } from "@mui/material/styles";

const StepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.grey[700],
    display: "flex",
    height: 30,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#5865f2",
    }),
    "& .StepIcon-completedIcon": {
      color: "#5865f2",
      zIndex: 1,
      fontSize: 20,
    },
    "& .StepIcon-circle": {
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

export default StepIconRoot;
