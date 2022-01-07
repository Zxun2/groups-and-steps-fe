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
      // @ts-ignore
      main: "#000000",
      contrast: "#FFFFFF",
    },
    background: {
      // @ts-ignore
      primary: "#282424",
      secondary: "#2f3136",
      tertiary: "#36393f",
      default: "#36393f",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default theme;
