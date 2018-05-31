import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    color: theme.palette.primary.light
  },
  container: {
    minHeight: "15vh",
    backgroundColor: theme.palette.secondary.dark
  },
  colContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  footerLink: {
    color: `${theme.palette.primary.light} !important`,
    "&:hover": {
      color: theme.palette.common.white
    }
  }
});

const PublicFooterLayout = ({ classes }) => (
  <Grid container spacing={8} className={classes.container}>
    <Grid item xs={12} sm={4} className={classes.colContainer}>
      <Typography
        variant="title"
        align="center"
        component={Link}
        to="/stack"
        className={classes.footerLink}
      >
        STACK
      </Typography>
    </Grid>
    <Grid item xs={12} sm={4} className={classes.colContainer}>
      <Typography
        variant="subheading"
        align="center"
        component={Link}
        to="/about"
        className={classes.footerLink}
      >
        About Me
      </Typography>
      <Typography
        variant="subheading"
        align="center"
        component={Link}
        to="/posts"
        className={classes.footerLink}
      >
        Posts
      </Typography>
      <Typography
        variant="subheading"
        align="center"
        component={Link}
        to="/wip"
        className={classes.footerLink}
      >
        Work in Progress
      </Typography>
    </Grid>
    <Grid item xs={12} sm={4} className={classes.colContainer}>
      <Typography
        variant="title"
        align="center"
        component={Link}
        to="/"
        className={classes.footerLink}
      >
        NOINCOMEDEV.ME
      </Typography>
      <div style={{ display: "inline", color: "#CDCADE" }}>
        <Button
          className={classes.button}
          ariant="flat"
          href="https://www.instagram.com/noincomedev"
        >
          <i className="fab fa-instagram fa-3x" />
        </Button>
        <Button
          className={classes.button}
          variant="flat"
          href="https://www.twitter.com/noincomedev"
        >
          <i className="fab fa-twitter fa-3x" />
        </Button>
        <Button
          className={classes.button}
          variant="flat"
          href="https://www.github.com/noincomedev"
        >
          <i className="fab fa-github fa-3x" />
        </Button>
      </div>
    </Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(PublicFooterLayout);
