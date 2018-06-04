import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    padding: theme.spacing.unit
  }
});

const AccountsButtons = ({ classes, history }) => (
  <div className={classes.container}>
    <Button
      color="primary"
      variant="raised"
      onClick={event => {
        event.preventDefault();
        history.push("/signin");
      }}
    >
      Sign In
    </Button>
    <Button
      color="secondary"
      variant="raised"
      onClick={event => {
        event.preventDefault();
        history.push("/signup");
      }}
    >
      Sign Up
    </Button>
  </div>
);

export default withStyles(styles, { withTheme: true })(
  withRouter(AccountsButtons)
);
