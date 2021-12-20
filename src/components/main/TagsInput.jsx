import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";
import randomColor from "randomcolor";
import { Box } from "@mui/material";
import { tagInputStyles } from "../ui/Style";

export default function TagsInput({ ...props }) {
  const classes = tagInputStyles();
  const {
    selectedItem,
    setSelectedItem,
    selectedTags,
    placeholder,
    tags,
    ...other
  } = props;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setSelectedItem(tags);
  }, [tags, setSelectedItem]);

  useEffect(() => {
    selectedTags(selectedItem);
  }, [selectedItem, selectedTags]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const newSelectedItem = [...selectedItem];

      const duplicatedValues = newSelectedItem.indexOf(
        // Trim input field
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }

      // \s means "match whitespace" and the g is a flag which means "global", i.e. Match all whitespace, not just the first.
      if (!event.target.value.replace(/\s/g, "").length) return;

      // Add tag to array
      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue("");
    }

    // This checks for the BACKSPACE keydown event.
    // Validates presence of current tags and remove the last item in the list
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  function handleChange(item) {
    let newSelectedItem = [...selectedItem];

    // Validates input by checking for duplication
    // If valid, add new tag into array
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = (item) => () => {
    // DO NOT MUTATE ORIGINAL ARRAY
    const newSelectedItem = [...selectedItem];
    // Look for item in array and splice it
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <div>
              <TextField
                InputProps={{
                  // Leading adornment for this input.
                  startAdornment: (
                    <Box className={classes.scrollbar}>
                      {selectedItem.map((item) => {
                        const color = randomColor();
                        return (
                          <Chip
                            key={item}
                            tabIndex={-1}
                            label={item}
                            className={classes.chip}
                            onDelete={handleDelete(item)}
                            style={{ backgroundColor: `${color}` }}
                          />
                        );
                      })}
                    </Box>
                  ),
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus,
                  color: "primary",
                  style: {
                    color: "white",
                    fontSize: "1.05rem",
                  },
                }}
                {...other}
                {...inputProps}
              />
            </div>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
}
TagsInput.defaultProps = {
  tags: [],
};
TagsInput.propTypes = {
  selectedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};
