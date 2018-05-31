import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
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
    color: theme.palette.primary.light,
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
    </Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(PublicFooterLayout);
