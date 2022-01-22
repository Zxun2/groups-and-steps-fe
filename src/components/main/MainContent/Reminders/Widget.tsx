import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import { Step } from "types";
import { useAppSelector } from "hooks/useHooks";
import { getUserState } from "store/user-slice";
import { useHttp2 } from "hooks/useHttp";
import { updateCurrStep } from "store/steps-slice";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  position: "relative",
  zIndex: 1,
  height: "fit-content",
  backgroundColor: "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
  "& : hover": {
    color: "#28282b",
    cursor: "pointer",
  },
  width: "14rem",
  boxShadow: "5px 10px rgba(0,0,0,0.1)",
}));

interface ReminderProps {
  step: Step;
}

const Reminder = ({ step }: ReminderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const { currUser } = useAppSelector(getUserState);
  const { sendRequest: updateStep } = useHttp2(updateCurrStep);
  const open = Boolean(anchorEl);

  const completeStepHandler = (todo_id: number, step_id: number) => {
    return updateStep({
      todo_id,
      step_id,
      content: {
        completed: true,
        deadline: null,
      },
    });
  };

  return (
    <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <Widget onClick={completeStepHandler.bind(null, step.todo_id, step.id)}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ minWidth: 0, color: "#fff" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {currUser?.name}
            </Typography>
            <Typography noWrap>{step.step}</Typography>
            <Typography variant="caption" noWrap letterSpacing={-0.25}>
              Tags: {step.tags.join(", ").slice(0, 29) + "..."}
            </Typography>
          </Box>
        </Box>
      </Widget>
      <Popover
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Click to complete the task!</Typography>
      </Popover>
    </Box>
  );
};

export default Reminder;
