import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  notification: {
    width: "100%",
    height: "3rem",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 10%",
    alignItems: "center",
    color: "white",
    " & > h2 p": {
      fontSize: "1rem",
      margin: "0",
    },
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  success: {
    backgroundColor: theme.palette.success.main,
  },
}));

const Notification = (props) => {
  const classes = useStyles();
  let specialClasses = "";

  if (props.status === "error") {
    specialClasses = classes.error;
  }
  if (props.status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;
