import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link, Redirect, withRouter } from "react-router-dom";

import AccountsButtons from "../accounts/AccountsButtons";

const styles = theme => ({
  button: {
    color: theme.palette.primary.light,
    "&:hover": {
      color: "white"
    }
  },
  container: {
    backgroundColor: theme.palette.primary.dark
  },
  centeredGridItem: {
    display: "flex",
    justifyContent: "center"
  },
  logo: {
    alignSelf: "right",
    padding: 8,
    color: theme.palette.custom.success,
    textShadow: "4px 4px black",
    "&:first-child": { color: theme.palette.common.white },
    "&:nth-child(2)": { color: theme.palette.custom.error },
    "&:nth-last-child(2)": { color: theme.palette.custom.text },
    "&:last-child": { paddingRigth: 0, color: theme.palette.common.white }
  },
  mediaSection: {
    backgroundColor: theme.palette.secondary.contrastText,
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
    boxShadow: theme.shadows[4]
  }
});

const Header = ({ classes, history }) => (
  <header className={classes.header}>
    <Grid container className={classes.container} justify="center">
      <Hidden xsDown>
        <Typography variant="display3" className={classes.logo}>
          {`{`}
        </Typography>
        {"NO INCOME DEV".split(" ").map(word => (
          <Typography variant="display3" className={classes.logo}>
            {word}
          </Typography>
        ))}
        <Typography variant="display3" className={classes.logo}>
          {`}`}
        </Typography>
      </Hidden>
      <Hidden smUp>
        <Typography variant="display3" className={classes.logo}>
          {`{`}
        </Typography>
        <Typography variant="display3" className={classes.logo}>
          !
        </Typography>
        <Typography variant="display3" className={classes.logo}>
          $
        </Typography>
        <Typography variant="display3" className={classes.logo}>
          DEV
        </Typography>
        <Typography variant="display3" className={classes.logo}>
          {`}`}
        </Typography>
      </Hidden>
    </Grid>
    {Meteor.settings.public.validateNewUser && (
      <Grid container className={classes.container} justify="center">
        <AccountsButtons />
      </Grid>
    )}
    <Grid className={classes.mediaSection} container>
      <Grid className={classes.centeredGridItem} item xs={4}>
        <Button
          className={classes.button}
          variant="flat"
          href="https://www.instagram.com/noincomedev"
        >
          <i className="fab fa-instagram fa-2x" />
        </Button>
      </Grid>
      <Grid className={classes.centeredGridItem} item xs={4}>
        <Button
          className={classes.button}
          variant="flat"
          href="https://www.twitter.com/noincomedev"
        >
          <i className="fab fa-twitter fa-2x" />
        </Button>
      </Grid>
      <Grid className={classes.centeredGridItem} item xs={4}>
        <Button
          className={classes.button}
          variant="flat"
          href="https://github.com/noincomedev"
        >
          <i className="fab fa-github fa-2x" />
        </Button>
      </Grid>
    </Grid>
  </header>
);

export default withStyles(styles, { withTheme: true })(withRouter(Header));
