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
    overflow: "auto"
  }
});

const Public = ({ classes, posts }) => (
  <Grid container spacing={16} classes={{ container: classes.container }}>
    <Grid item xs={12}>
      <Typography variant="headline">Recent Articles</Typography>
      <Divider />
    </Grid>
    {posts.map(post => <PublicPostItem post={post} key={post._id} />)}
  </Grid>
);

Public.propTypes = {
  posts: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(Public);
