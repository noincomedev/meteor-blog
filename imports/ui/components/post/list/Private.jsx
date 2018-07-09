import React, { Component, Fragment } from "react";

import { Helmet } from "react-helmet";
import { PropTypes } from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CardWithTitleAndContent from "../../../layouts/components/card/CardWithTitleAndContent";

import PostForm from "../PostForm";
import PrivatePostItem from "./PrivatePostItem";

const styles = theme => ({
  container: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
    overflow: "auto"
  }
});

class Private extends Component {
  constructor(props) {
    super(props);
    const { posts } = props;
    this.state = { controls: posts.length > 0 };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts.length > 0 && this.props.posts.length == 0) {
      this.toggleControls();
    }
  }

  toggleControls = () => {
    this.setState({ controls: !this.state.controls });
  };

  render() {
    const { classes, posts } = this.props;
    const { controls } = this.state;
    return (
      <Grid container className={classes.container} justify="center">
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={8}>
            <Typography variant="title" color="inherit">
              Posts
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
          >
            {controls && (
              <Button
                variant="flat"
                color="secondary"
                onClick={this.toggleControls}
                className={classes.button}
              >
                +
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {!controls && (
          <Grid item xs={12} style={{ paddingRight: 8 }}>
            <Helmet>
              <title>NOINCOMEDEV | Add Post</title>
              <meta name="Add Post" content="Add Post" />
            </Helmet>
            <CardWithTitleAndContent title="New Post">
              <PostForm handleCancel={this.toggleControls} />
            </CardWithTitleAndContent>
          </Grid>
        )}
        {controls &&
          posts.length > 0 &&
          posts.map(post => (
            <Grid item xs={12} key={post._id}>
              <PrivatePostItem post={post} />
            </Grid>
          ))}
      </Grid>
    );
  }
}

Private.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(Private);
