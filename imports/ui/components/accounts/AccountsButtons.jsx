import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    paddingBottom: 16
  },
  contrastButton: {
    marginRight: 16,
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    "&:hover": { background: theme.palette.secondary.contrastText }
  },
  darkButton: {
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
    "&:hover": { background: theme.palette.secondary.contrastText }
  }
});

const AccountsButtons = ({ classes, history }) => (
  <Grid className={classes.container} container justify="center">
    <Button
      className={classes.contrastButton}
      variant="raised"
      onClick={event => {
        event.preventDefault();
        history.push("/signin");
      }}
    >
      Sign In
    </Button>
    <Button
      className={classes.darkButton}
      variant="raised"
      onClick={event => {
        event.preventDefault();
        history.push("/signup");
      }}
    >
      Sign Up
    </Button>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(
  withRouter(AccountsButtons)
);
