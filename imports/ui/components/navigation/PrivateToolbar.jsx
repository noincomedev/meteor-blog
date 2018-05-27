import React from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";

const styles = theme => ({
  customToolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    minHeight: 64
  },
  link: {
    color: theme.palette.custom.text,
    textDecoration: "none"
  },
  title: {
    color: theme.palette.custom.success
  },
  typoContainer: { flex: 1 }
});

const PrivateToolbar = ({ classes, client, title }) => (
  <Toolbar className={classes.customToolbar}>
    <div className={classes.typoContainer}>
      <Typography variant="body1">
        <Link className={classes.link} to="/">
          NOINCOMEBLOG
        </Link>
      </Typography>
    </div>
    <Typography className={classes.title} variant="body1">
      {title}
    </Typography>
    <IconButton
      color="inherit"
      className={classes.menuButton}
      onClick={event => {
        Meteor.logout(error => {
          if (!error) client.resetStore();
        });
      }}
    >
      <ExitToApp />
    </IconButton>
  </Toolbar>
);

export default withStyles(styles, { withTheme: true })(
  withApollo(PrivateToolbar)
);
