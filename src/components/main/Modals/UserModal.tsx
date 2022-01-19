import { Modal, Box, Button } from "@mui/material";
import { Typography } from "@material-ui/core";
import { userModalStyle } from "../../../styles/Style";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../../../store/user-slice";

type UserModalProps = {
  open: boolean;
  handleClose: () => void;
};

function UserModal(props: UserModalProps) {
  const history = useHistory();
  const classes = userModalStyle();
  const dispatch = useDispatch();

  const logOutHandler = () => {
    localStorage.removeItem("token");
    history.push("/");
    dispatch(userAction.logUserOut());
  };
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box className={classes.modal}>
        <Typography
          style={{ fontWeight: "600", textAlign: "center", margin: "1rem" }}
          variant="h5"
          color="secondary"
        >
          User Log Out
        </Typography>
        <Typography
          style={{ fontWeight: "400", textAlign: "center", color: "#cccccc" }}
          variant="subtitle1"
        >
          Leaving already?
        </Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "revert",
            margin: "2rem",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            style={{ marginTop: "2rem" }}
            startIcon={<LogoutIcon />}
            onClick={logOutHandler}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default UserModal;
