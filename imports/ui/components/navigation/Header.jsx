import React from "react";

import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { Link, Redirect, withRouter } from "react-router-dom";

import AccountsButtons from "../accounts/AccountsButtons";

const styles = theme => ({
  button: {
    color: theme.palette.primary.light,
    "&:hover": {
      color: "white"
    }
  },
  header: {
    background: theme.palette.primary.dark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 0,
    flexDirection: "column",
    minHeight: "25vh",
    position: "relative"
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
    "&:nth-child(3)": {},
    "&:nth-last-child(2)": { color: theme.palette.custom.text },
    "&:last-child": { paddingRigth: 0, color: theme.palette.common.white }
  },
  mediaSection: {
    backgroundColor: theme.palette.secondary.contrastText,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    boxShadow: theme.shadows[4]
  }
});

const Header = ({ classes, history }) => (
  <header className={classes.header}>
    <Grid container justify="center">
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
        DEV
      </Typography>
      <Typography variant="display3" className={classes.logo}>
        {`}`}
      </Typography>
    </Grid>
    {Meteor.settings.public.validateNewUser && <AccountsButtons />}
    <Grid className={classes.mediaSection} container>
      <Grid className={classes.centeredGridItem} item xs={4}>
        <Button
          className={classes.button}
          variant="flat"
          href="https://www.instagram.com/noincomedev"
        >
          <i className="fab fa-instagram fa-3x" />
        </Button>
      </Grid>
      <Grid className={classes.centeredGridItem} item xs={4}>
        <Button
          className={classes.button}
          variant="flat"
          href="https://www.twitter.com/noincomedev"
        >
          <i className="fab fa-twitter fa-3x" />
        </Button>
      </Grid>
      <Grid className={classes.centeredGridItem} item xs={4}>
        <Button
          className={classes.button}
          variant="flat"
          href="https://github.com/noincomedev"
        >
          <i className="fab fa-github fa-3x" />
        </Button>
      </Grid>
    </Grid>
  </header>
);

export default withStyles(styles, { withTheme: true })(withRouter(Header));
