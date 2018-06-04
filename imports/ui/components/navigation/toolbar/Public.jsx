import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";

import AccountsButtons from "../../accounts/AccountsButtons";

const styles = theme => ({
  content: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end"
  },
  logo: {
    color: theme.palette.custom.text
  },
  title: {
    color: theme.palette.custom.success
  }
});

const Public = ({ classes, location, match, title }) => (
  <Toolbar>
    <Typography
      className={classes.logo}
      component={Link}
      to="/"
      variant="title"
    >
      NOINCOMEDEV
    </Typography>
    <div className={classes.content}>
      {location.pathname == "/" &&
        match.isExact &&
        Meteor.settings.public.validateNewUser && <AccountsButtons />}
      <Typography className={classes.title} variant="body1">
        {title}
      </Typography>
    </div>
  </Toolbar>
);

export default withStyles(styles, { withTheme: true })(withRouter(Public));
