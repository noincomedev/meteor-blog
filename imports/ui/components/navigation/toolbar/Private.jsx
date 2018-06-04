import React from "react";
import classNames from "classnames";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";

import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import ExitToApp from "@material-ui/icons/ExitToApp";

const styles = theme => ({
  drawerOpen: {
    paddingLeft: theme.spacing.unit * 2
  },
  hide: {
    display: "none"
  },
  logo: {
    color: theme.palette.custom.text,
    marginLeft: theme.spacing.unit * 3
  },
  menuButton: { marginRight: theme.spacing.unit * 2 },
  menuIcon: { paddingLeft: theme.spacing.unit * 3 },
  toolbarButtonsContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end"
  }
});

const Private = ({ classes, client, open, onToggleDrawer }) => (
  <Toolbar disableGutters className={classNames(open && classes.drawerOpen)}>
    <Hidden mdUp>
      <IconButton
        classes={{
          root: classNames(!open && classes.menuButton),
          label: classNames(!open && classes.menuIcon)
        }}
        color="inherit"
        aria-label="open drawer"
        onClick={onToggleDrawer}
        className={classNames(open && classes.hide)}
      >
        <Menu />
      </IconButton>
    </Hidden>
    <Typography
      className={classes.logo}
      component={Link}
      color="inherit"
      to="/"
      variant="title"
    >
      NOINCOMEDEV
    </Typography>
    <div className={classes.toolbarButtonsContainer}>
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
    </div>
  </Toolbar>
);

Private.propTypes = {
  onToggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(withApollo(Private));
