import React, { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";
import randomColor from "randomcolor";
import { Box } from "@mui/material";
import { tagInputStyles } from "../../../styles/Style";

type TagsInputProps = {
  selectedItem: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
  selectedTags: (items: string[]) => void;
  fullWidth: boolean;
  variant: string;
  id: string;
  tags?: string[] | [];
};

const TagsInput: React.FC<TagsInputProps> = ({
  // Array of Tags
  selectedItem,
  // Setter
  setSelectedItem,
  // HandleSelectedTags so that i can use it
  selectedTags,
  placeholder,
  variant,
  tags,
  ...other
}) => {
  const classes = tagInputStyles();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setSelectedItem(tags || []);
  }, [tags, setSelectedItem]);

  useEffect(() => {
    selectedTags(selectedItem);
  }, [selectedItem, selectedTags]);

  function handleKeyDown(event: React.SyntheticEvent) {
    if ((event as React.KeyboardEvent<HTMLDivElement>).key === "Enter") {
      const newSelectedItem = [...selectedItem];

      const duplicatedValues = newSelectedItem.indexOf(
        (event as React.ChangeEvent<HTMLInputElement>).target.value.trim()
      );

      // Check duplicates
      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }

      // \s means "match whitespace" and the g is a flag which means "global", i.e. Match all whitespace, not just the first.
      if (
        (event as React.ChangeEvent<HTMLInputElement>).target.value.replace(
          /\s/g,
          ""
        ).length === 0
      )
        return;

      // Add tag to array
      newSelectedItem.push(
        (event as React.ChangeEvent<HTMLInputElement>).target.value.trim()
      );
      setInputValue("");
      setSelectedItem(newSelectedItem);
    }

    // This checks for the BACKSPACE keydown event.
    // Validates presence of current tags and remove the last item in the list
    if (
      selectedItem?.length &&
      !inputValue?.length &&
      (event as React.KeyboardEvent<HTMLDivElement>).key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem?.length - 1));
    }
  }

  const handleDelete = (item: string) => () => {
    // DO NOT MUTATE ORIGINAL ARRAY
    const newSelectedItem = [...selectedItem];
    // Look for item in array and splice it
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <React.Fragment>
      <Downshift selectedItem={selectedItem} inputValue={inputValue}>
        {({ getInputProps }) => {
          // const { onBlur, onChange, onFocus } = getInputProps({
          //   onKeyDown: handleKeyDown,
          //   placeholder,
          // });
          return (
            <div>
              <Box className={classes.scrollbar}>
                {selectedItem?.map((item) => {
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
              <TextField
                variant={variant as "filled"}
                InputProps={{
                  value: inputValue,
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(event);
                  },
                  style: {
                    color: "white",
                    fontSize: "1.05rem",
                  },
                }}
                {...other}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
              />
            </div>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
};

export default TagsInput;
