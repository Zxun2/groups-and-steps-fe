import SelectLabels from "./ViewSelect";
import CustomScrollbars from "../../ui/CustomScollBars";
import FilterLabel from "../FilterComponent/Filter";
import AddTaskIcon from "../../svgs/AddtasksIcon";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import TagsInput from "../Tag/TagsInput";
import { Fragment } from "react";
import RenderSteps from "./RenderSteps";
import { Divider } from "@mui/material";
import { Box } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import { Chip } from "@material-ui/core";
import { Stack } from "@mui/material";
import { getAllSteps } from "../../../store/steps-slice";
import { stepStyles } from "../../../styles/Style";
import { useAppSelector } from "../../../hooks/useHooks";
import { LabelType } from "../../../types";
import Reminders from "./Reminders";

type MainViewProps = {
  toggleDetails: boolean;
  setToggleDetails: React.Dispatch<React.SetStateAction<boolean>>;
  todoId: number;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  value: LabelType[];
  setValue: React.Dispatch<React.SetStateAction<LabelType[]>>;
  addStepHandler: (e: React.FormEvent<EventTarget>) => void;
  handleSelectedTags: (items: string[]) => void;
  selectedItem: string[] | [];
  setSelectedItem: React.Dispatch<React.SetStateAction<string[] | []>>;
  stepRef: React.MutableRefObject<HTMLInputElement | undefined>;
};

const MainView: React.FC<MainViewProps> = ({
  toggleDetails,
  setToggleDetails,
  todoId,
  view,
  setView,
  value,
  setValue,
  addStepHandler,
  handleSelectedTags,
  selectedItem,
  setSelectedItem,
  stepRef,
}) => {
  const steps = useAppSelector(getAllSteps);
  const classes = stepStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Box
          className={`${classes.main} ${steps?.length === 0 && classes.notask}`}
        >
          {steps?.length === 0 && (
            <Fragment>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  color="secondary"
                  style={{
                    fontWeight: "600",
                    textAlign: "center",
                    marginBottom: "2rem",
                  }}
                >
                  Create a <span style={{ color: "#5865f2" }}>step</span> to get
                  started!
                </Typography>
                <AddTaskIcon />
              </Box>
            </Fragment>
          )}
          {steps?.length !== 0 && todoId !== -1 && (
            <Fragment>
              {toggleDetails && (
                <Box
                  style={{
                    background: "#2f3136",
                    height: "15vh",
                    marginBottom: "2rem",
                    borderRadius: "10px",
                    maxWidth: "90vw",
                    display: "flex",
                  }}
                >
                  <Reminders />
                </Box>
              )}
              <Box className={classes.root}>
                <CustomScrollbars
                  style={{ height: "100%" }}
                  //@ts-ignore
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                >
                  <Box className={classes.filter}>
                    <FilterLabel value={value} setValue={setValue} />
                    <SelectLabels
                      toggleDetails={toggleDetails}
                      setToggleDetails={setToggleDetails}
                      setView={setView}
                    />
                  </Box>
                  <RenderSteps view={view} setValue={setValue} />
                </CustomScrollbars>
              </Box>
              <Divider>
                <Chip
                  onClick={addStepHandler}
                  label="ADD TASK"
                  color="primary"
                  size="medium"
                />
              </Divider>
            </Fragment>
          )}
          <Stack
            direction={"column"}
            className={classes.inputField}
            style={{
              width: `${steps?.length === 0 ? "70% " : "100% "}`,
            }}
          >
            <TagsInput
              selectedTags={handleSelectedTags}
              fullWidth
              variant="filled"
              id="tags"
              placeholder="Enter to add Tags"
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            <TextField
              fullWidth
              // @ts-ignore
              component="form"
              color="primary"
              size="medium"
              placeholder="Add steps"
              onSubmit={addStepHandler}
              inputRef={stepRef}
              variant="filled"
              InputProps={{
                color: "primary",
                style: { color: "white", fontSize: "1.05rem" },
              }}
            />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainView;
