import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import FiberNew from "@material-ui/icons/FiberNew";
import Forward from "@material-ui/icons/Forward";
import { withWidth, withStyles } from "@material-ui/core";

import PublicPostItem from "./PublicPostItem";

const styles = theme => ({
  container: {
    maxHeight: "100vh",
    overflow: "auto",
    paddingBottom: theme.spacing.unit
  },
  iconButton: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: theme.spacing.unit
  }
});

const Public = ({ classes, posts, width }) => {
  const setCols = () => {
    switch (width) {
      case "xs":
        return 2;
      case "sm":
        return 2;
      default:
        return 1;
    }
  };
  return (
    <Grid container classes={{ container: classes.container }}>
      <Grid item xs={12} classes={{ item: classes.item }}>
        <GridList>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Recent Articles</ListSubheader>
          </GridListTile>
          {posts.map(post => (
            <GridListTile
              key={post._id}
              cols={setCols(width)}
              component={Link}
              to={`/posts/${post.slug}`}
            >
              <img src={`${post.imageUrl}`} alt={post.title} />
              <GridListTileBar
                title={post.title}
                subtitle={<span>{post.intro}</span>}
                actionIcon={
                  <IconButton className={classes.iconButton}>
                    {post.new ? <FiberNew /> : <Forward />}
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
    </Grid>
  );
};

Public.propTypes = {
  posts: PropTypes.array
};

export default withWidth()(withStyles(styles, { withTheme: true })(Public));
