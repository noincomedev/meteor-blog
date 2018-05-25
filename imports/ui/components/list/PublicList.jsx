import React, { Component, Fragment } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import PublicPostItem from "../post/PublicPostItem";

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class PublicList extends Component {
  render() {
    const { classes, posts } = this.props;
    return (
      <Grid container className={classes.container} spacing={16}>
        {posts.map(post => <PublicPostItem post={post} key={post._id} />)}
      </Grid>
    );
  }
}

PublicList.propTypes = {
  posts: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(PublicList);
