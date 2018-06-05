import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    minHeight: "15vh",
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing.unit
    }
  },
  footerLink: {
    color: `${theme.palette.secondary.light} !important`,
    "&:hover": {
      color: "white !important"
    }
  },
  itemContainer: {
    height: "100%",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  stack: {
    color: theme.palette.custom.text
  }
});

const PublicFooterLayout = ({ classes }) => (
  <Grid container spacing={8} className={classes.container}>
    <Grid item xs={12} sm={4}>
      <div className={classes.itemContainer}>
        <Typography
          variant="title"
          align="center"
          component={Link}
          to="/stack"
          className={classNames(classes.footerLink, classes.stack)}
        >
          STACK
        </Typography>
      </div>
    </Grid>
    <Grid item xs={12} sm={4}>
      <div className={classes.itemContainer}>
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
      </div>
    </Grid>
    <Grid item xs={12} sm={4}>
      <div className={classes.itemContainer}>
        <Typography
          variant="title"
          align="center"
          component={Link}
          to="/"
          color="secondary"
        >
          NOINCOMEDEV.ME
        </Typography>
        <Grid container>
          <Grid item xs>
            <Button
              color="secondary"
              ariant="flat"
              href="https://www.instagram.com/noincomedev"
              fullWidth
            >
              <i className="fab fa-instagram fa-3x" />
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              color="secondary"
              variant="flat"
              href="https://www.twitter.com/noincomedev"
              fullWidth
            >
              <i className="fab fa-twitter fa-3x" />
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              color="secondary"
              variant="flat"
              href="https://www.github.com/noincomedev"
              fullWidth
            >
              <i className="fab fa-github fa-3x" />
            </Button>
          </Grid>
        </Grid>
      </div>
    </Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(PublicFooterLayout);
