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
      light: "#FF8CC6",
      main: "#E040FB",
      dark: "#512DA8",
      contrastText: "#CF256D"
    },
    custom: {
      error: "#d45753",
      success: "#d1e37f",
      text: "#94d6d6"
    }
  }
});
