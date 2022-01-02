import { useState, useRef, Fragment } from "react";
import { TextField } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { v4 } from "uuid";
import { Box } from "@material-ui/core";
import { postTodo } from "../../../store/todo-slice";
import { useHttp2 } from "../../../hooks/useHttp";

const filter = createFilterOptions();

export default function NavInput(props) {
  const options = [...props.Todos];

  const [dialogValue, setDialogValue] = useState({
    title: "",
  });
  const [open, toggleOpen] = useState(false);
  const [value, setValue] = useState("");

  const searchRef = useRef();
  const todoRef = useRef();

  const { sendRequest: createTodo } = useHttp2(postTodo);

  const handleClose = () => {
    // Empty Input
    setDialogValue({
      title: "",
    });

    // Close Modal
    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setValue({
      title: dialogValue.title,
    });

    // Validation already done once by searchSubmitHandler
    // No need for further validation
    const title = todoRef.current.value.trim();

    if (title !== "") {
      createTodo({ content: { title } });
    }

    todoRef.current.value = "";
    searchRef.current.value = "";

    handleClose();
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (searchRef.current.value.trim() !== "") {
      const index = options.findIndex(
        (Todo) => Todo.title === searchRef.current.value.trim()
      );

      if (index !== -1) {
        const { title, id } = options[index];
        // Change Content of screen
        props.changeContentHandler(title, id);
      }
    }

    setValue("");
  };

  return (
    <Fragment>
      <Autocomplete
        value={value}
        autoComplete={true}
        // Does not actually mean onChange (more-of onEnter)
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              if (searchRef.current.value.trim() !== "") {
                const index = options.findIndex(
                  (Todo) => Todo.title === searchRef.current.value.trim()
                );

                // If todo is not found, toggle open Modal
                if (index === -1) {
                  toggleOpen(true);
                  setDialogValue({
                    title: newValue,
                  });
                }
              }
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        options={options}
        // Decides on what to search on. Option<Obj>
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        // What the search results should look like
        renderOption={(props, option) => (
          // Unique key. IMPORTANT: ALWAYS ADD AFTER THE SPREAD OPERATOR
          <li {...props} key={v4()}>
            {option.title}
          </li>
        )}
        sx={{ width: "10rem" }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            component="form"
            inputRef={searchRef}
            placeholder="Search Todo"
            onSubmit={searchSubmitHandler}
            variant="standard"
          />
        )}
      />
      <Dialog open={open} onClose={handleClose} style={{ margin: "0" }}>
        <Box style={{ backgroundColor: "#36393f" }}>
          <DialogTitle color="white" style={{ textAlign: "center" }}>
            Add a new Todo
          </DialogTitle>
          <DialogContent>
            <DialogContentText color="white">
              Are you looking for a Todo not in the list? Please, add it!
            </DialogContentText>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "revert",
                margin: "2rem",
              }}
            >
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.title}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    title: event.target.value,
                  })
                }
                type="text"
                variant="standard"
                component="form"
                onSubmit={handleSubmit}
                InputProps={{
                  style: { color: "white", fontSize: "1.05rem" },
                }}
                inputRef={todoRef}
              />
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </Fragment>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
