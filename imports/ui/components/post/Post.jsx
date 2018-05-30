import React, { Component, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Helmet } from "react-helmet";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import { GET_POST } from "./PostEditor";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Alarm from "@material-ui/icons/Alarm";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Spinner from "../utils/Spinner";

import CardWithImage from "../../layouts/components/card/CardWithImage";

styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.common.white
  },
  chip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.light
  },
  divider: { marginBottom: theme.spacing.unit },
  text: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit / 2
  },
  tagsContainer: { marginTop: theme.spacing.unit }
});

const Post = ({ classes, slug }) => (
  <Query query={GET_POST} variables={{ slug }}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error!: ${error}`;
      const { post } = data;
      if (!post) return <Redirect to="/not-found" />;
      return (
        <Grid container justify="center">
          <Helmet>
            <title>{`NOINCOMEDEV | ${post.title}`}</title>
            <meta name="Read Post" content="Post" />
          </Helmet>
          <Grid item xs={12} md={6}>
            <CardWithImage imageUrl={post.imageUrl} title={post.title}>
              <Fragment>
                <Typography gutterBottom variant="headline" component="h2">
                  {post.title}
                </Typography>
                <Divider className={classes.divider} light />
                <ReactMarkdown skipHtml source={post.content} />
                <div className={classes.tagsContainer}>
                  <Typography className={classes.text} component="p">
                    TAGS:
                  </Typography>
                  {post.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={`#${tag}`}
                      className={classes.tag}
                    />
                  ))}
                </div>
              </Fragment>
            </CardWithImage>
          </Grid>
        </Grid>
      );
    }}
  </Query>
);

Post.propTypes = {
  slug: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(Post);
