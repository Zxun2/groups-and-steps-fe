import React from "react";
import { Box, Stack, Chip } from "@mui/material";
import { Typography } from "@material-ui/core";
import { tagInputStyles } from "../../../styles/Style";
import randomColor from "randomcolor";

interface TaskTagsProps {
  tags: string[];
}

const TaskTags: React.FC<TaskTagsProps> = ({ tags }) => {
  const classes = tagInputStyles();

  return (
    <Box className={classes.scrollbar}>
      {tags?.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          style={{
            paddingLeft: "0.5rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* TAGS ARE RENDERED HERE */}
          <Typography color="secondary" variant="body2">
            Tags:
          </Typography>
          {tags.map((tag, index) => {
            const color = randomColor();
            return (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
                color="primary"
                style={{ color: `${color}` }}
              />
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default TaskTags;
