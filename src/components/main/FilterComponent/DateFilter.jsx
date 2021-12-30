import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { dateStyles } from "../../ui/Style";

export default function StaticDatePickerLandscape() {
  const [value, setValue] = React.useState(new Date());
  const classes = dateStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        orientation="landscape"
        style={{ fontSize: "14rem" }}
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
