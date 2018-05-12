import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Link, Redirect, withRouter } from "react-router-dom";

import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import IconButton from "material-ui/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { withStyles } from "material-ui/styles";

const styles = theme => ({
  flex: {
    flex: 1,
    display: "flex",
    alignSelf: "right"
  },
  header: {
    background: theme.palette.primary.dark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "cetner",
    flexGrow: 0,
    flexDirection: "column",
    minHeight: "25vh",
    borderColor: "#CF256D",
    borderStyle: "solid",
    borderWidth: "0px 0px 8px 0px",
    boxShadow: theme.shadows[3],
    position: "relative"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 0,
    marginBottom: 16
  },
  logo: {
    alignSelf: "right",
    padding: 8,
    color: theme.palette.custom.success,
    textShadow: "4px 4px black",
    "&:first-child": { color: theme.palette.common.white },
    "&:nth-child(2)": { color: theme.palette.custom.error },
    "&:nth-child(3)": {},
    "&:nth-last-child(2)": { color: theme.palette.custom.text },
    "&:last-child": { paddingRigth: 0, color: theme.palette.common.white }
  },
  contrastButton: {
    marginRight: 16,
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    "&:hover": { background: theme.palette.secondary.contrastText }
  },
  darkButton: {
    margin: "auto",
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
    "&:hover": { background: theme.palette.secondary.contrastText }
  },
  customAappbar: {},
  customToolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    minHeight: 64
  },
  name: {
    color: theme.palette.custom.success
  },
  typoContainer: { flex: 1 },
  link: {
    color: theme.palette.custom.text,
    textDecoration: "none"
  }
});

const PublicNavigationLayout = ({ classes, location, history, name }) => (
  <nav>
    {location.pathname != "/" ? (
      <div>
        <AppBar
          className={classes.customAappbar}
          position="fixed"
          color="primary"
        >
          <Toolbar className={classes.customToolbar}>
            <div className={classes.typoContainer}>
              <Typography className={classes.typography} variant="body1">
                <Link className={classes.link} to="/">
                  NOINCOMEBLOG
                </Link>
              </Typography>
            </div>
            <Typography className={classes.name} variant="body1">
              {name}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    ) : (
      <header className={classes.header}>
        <div className={classes.container}>
          <Typography variant="display3" className={classes.logo}>
            {`{`}
          </Typography>
          <Typography variant="display3" className={classes.logo}>
            NO
          </Typography>
          <Typography variant="display3" className={classes.logo}>
            INCOME
          </Typography>
          <Typography variant="display3" className={classes.logo}>
            BLOG
          </Typography>
          <Typography variant="display3" className={classes.logo}>
            {`}`}
          </Typography>
        </div>
        <div className={classes.container}>
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
        </div>
      </header>
    )}
  </nav>
);

PublicNavigationLayout.propTypes = {
  name: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(
  withRouter(PublicNavigationLayout)
);
