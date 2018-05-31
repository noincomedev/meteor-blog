import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#CDCADE",
      main: "#3B295A"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      light: "#7E57C2",
      main: "#E040FB",
      dark: "#5E35B1",
      contrastText: "#CF256D"
    },
    custom: {
      error: "#d45753",
      success: "#d1e37f",
      text: "#94d6d6"
    }
  },
  overrides: {
    MuiButton: {
      raisedSecondary: {
        color: "white",
        backgroundColor: "#CF256D"
      },
      flatSecondary: {
        color: "white",
        backgroundColor: "#CF256D",
        "&:hover": {
          color: "white",
          backgroundColor: "#512DA8"
        }
      }
    }
  }
});
