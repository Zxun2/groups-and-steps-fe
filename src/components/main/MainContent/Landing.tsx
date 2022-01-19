import { Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import AppIcon from "../../svgs/AppIcon";
import { stepStyles } from "../../../styles/Style";
import { useAppSelector } from "../../../hooks/useHooks";
import { getUserState } from "../../../store/user-slice";

const Landing = () => {
  const classes = stepStyles();
  const userState = useAppSelector(getUserState);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        color="secondary"
        className={classes.text}
        style={{ fontWeight: "600", display: "inline" }}
      >
        Welcome{" "}
        <span style={{ color: "#5865f2" }}>{userState?.currUser?.name}</span>,
      </Typography>

      <Typography
        className={classes.text}
        variant="h4"
        color="secondary"
        style={{ fontWeight: "600", marginBottom: "2rem" }}
      >
        Create/Select a group to get started!
      </Typography>
      <AppIcon />
    </Box>
  );
};

export default Landing;
