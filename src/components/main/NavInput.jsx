import * as React from "react";
import { TextField } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { v4 } from "uuid";

const filter = createFilterOptions();

export default function NavInput(props) {
  const options = [...props.Todos];
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const searchRef = React.useRef();

  const handleClose = () => {
    setDialogValue({
      title: "",
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setValue({
      title: dialogValue.title,
    });

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
        props.changeContentHandler(title, id);
      }
    }
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              if (searchRef.current.value.trim() !== "") {
                const index = options.findIndex(
                  (Todo) => Todo.title === searchRef.current.value.trim()
                );

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
        renderOption={(props, option) => (
          // Unique key. IMPORTANT: ALWAYS ADD AFTER THE SPREAD OPERATOR
          <li {...props} key={v4()}>
            {option.title}
          </li>
        )}
        sx={{ width: "100%" }}
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
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
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
              label="title"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
