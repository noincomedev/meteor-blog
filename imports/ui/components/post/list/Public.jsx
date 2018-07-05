import React, { Component, Fragment } from "react";
import { PropTypes } from "prop-types";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import PublicPostItem from "./PublicPostItem";

const styles = theme => ({
  container: {
    maxHeight: "100vh",
    overflow: "auto",
    paddingBottom: theme.spacing.unit
  },
  item: {
    paddingTop: theme.spacing.unit
  }
});

const Public = ({ classes, posts }) => (
  <Grid container classes={{ container: classes.container }}>
    <Grid item xs={4}>
      <Typography variant="headline">Recent Articles</Typography>
      <Divider />
    </Grid>
    <Grid item xs={12} classes={{ item: classes.item }}>
      {posts.map(post => <PublicPostItem post={post} key={post._id} />)}
    </Grid>
  </Grid>
);

Public.propTypes = {
  posts: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(Public);
