import { createTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#5865f2",
    },
    secondary: {
      main: "#ffffff",
    },
    success: {
      main: "#4BB543",
    },
    error: {
      main: "#B33A3A",
    },
    text: {
      main: "#000000",
      contrast: "#FFFFFF",
    },
    background: {
      primary: "#2c2f33",
      secondary: "#23272A",
      tertiary: "#97A9B4",
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
