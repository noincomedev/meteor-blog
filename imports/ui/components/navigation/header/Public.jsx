import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Content from "./Content";

import ApolloIcon from "../../../../assets/icons/Apollo";
import MeteorIcon from "../../../../assets/icons/Meteor";
import ReactIcon from "../../../../assets/icons/React";

const styles = theme => ({
  header: {
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      marginTop: 64
    }
  },
  mapreContainer: {
    backgroundColor: theme.palette.custom.text,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    color: theme.palette.common.white
  },
  container: {
    padding: theme.spacing.unit * 3,
    minHeight: "25vh",
    maxHeight: "40vh",
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[4]
  },
  logo: {
    color: theme.palette.secondary.light,
    textShadow: `-1px 0 grey, 0 1px grey, 1px 0 grey, 0 -1px grey`
  },
  mapre: {
    color: theme.palette.secondary.main,
    textShadow: `4px 4px ${theme.palette.primary.light}`
  }
});

const Public = ({ classes }) => (
  <Hidden xsDown>
    <section className={classes.header}>
      <Content />
      <Grid
        className={classes.mapreContainer}
        container
        alignItems="center"
        justify="space-around"
      >
        <MeteorIcon size="lg" />
        <ApolloIcon size="lg" />
        <ReactIcon size="lg" />
      </Grid>
    </section>
  </Hidden>
);

export default withStyles(styles, { withTheme: true })(Public);
