import React, { Component, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
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

import FiberNew from "@material-ui/icons/FiberNew";
import CalendarToday from "../../../assets/icons/CalendarToday";

import Disqus from "disqus-react";

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
  container: {
    padding: theme.spacing.unit
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
      const disqusShortname = "noincomedev";
      const disqusConfig = {
        url: "https://www.noincomedev.me/" + slug,
        identifier: post._id,
        title: post.title
      };
      return (
        <Grid
          container
          justify="center"
          classes={{ container: classes.container }}
        >
          <Helmet>
            <title>{`NOINCOMEDEV | ${post.title}`}</title>
            <meta name="Read Post" content="Post" />
          </Helmet>
          <Grid item xs={12} md={6}>
            <CardWithImage imageUrl={post.imageUrl} title={post.title}>
              <Fragment>
                <Grid container style={{ alignItems: "center" }}>
                  <Grid
                    item
                    xs={8}
                    style={{
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Avatar className={classes.avatar}>
                      {post.new ? (
                        <FiberNew color="secondary" />
                      ) : (
                        <CalendarToday color="secondary" />
                      )}
                    </Avatar>
                    <Typography color="inherit" variant="body1">
                      {post.new
                        ? moment(post.created)
                            .startOf("day")
                            .fromNow()
                        : moment(post.created).format("LL")}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Typography color="primary" variant="caption">
                      {post.category}
                    </Typography>
                  </Grid>
                </Grid>
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
                      component={Link}
                      to={`/tags/${tag}`}
                    />
                  ))}
                </div>
              </Fragment>
            </CardWithImage>
            <Disqus.DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
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
