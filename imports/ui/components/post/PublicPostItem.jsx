import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { Link, withRouter } from "react-router-dom";

import Disqus from "disqus-react";

import Avatar from "@material-ui/core/Avatar";
import Alarm from "@material-ui/icons/Alarm";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

import FiberNew from "@material-ui/icons/FiberNew";
import CalendarToday from "../../../assets/icons/CalendarToday";

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.common.white
  },
  chip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.light
  },
  divider: { marginBottom: theme.spacing.unit },
  media: {
    [theme.breakpoints.up("md")]: {
      height: 175
    },
    [theme.breakpoints.down("sm")]: {
      height: 125
    }
  },
  text: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit / 2
  },
  markdown: {
    color: theme.palette.grey[600],
    flex: 1
  },
  item: {
    flexGrow: 1
  }
});

class PublicPostItem extends Component {
  state = {
    raised: false
  };

  toggleRaised = () => {
    this.setState({ raised: !this.state.raised });
  };

  onCardClick = event => {
    this.props.history.push(`/posts/${this.props.post.slug}`);
  };

  render() {
    const { classes, post } = this.props;
    const { raised } = this.state;

    const disqusShortname = "noincomedev";
    const disqusConfig = {
      url: "https://www.noincomedev.me/" + post.slug,
      identifier: post._id,
      title: post.title
    };

    return (
      <Grid item xs={12} className={classes.item}>
        <Card
          className={classes.card}
          raised={raised}
          onMouseLeave={this.toggleRaised}
          onMouseEnter={this.toggleRaised}
          onClick={this.onCardClick}
        >
          <CardMedia
            className={classes.media}
            image={
              post.imageUrl
                ? post.imageUrl
                : "http://via.placeholder.com/350x150"
            }
            src="image"
            title={post.title}
          />
          <CardContent
            id="public-post-content"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              paddingTop: 0
            }}
          >
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
            <ReactMarkdown
              skipHtml
              className={classes.markdown}
              source={post.intro}
            />
            <Disqus.CommentCount
              shortname={disqusShortname}
              config={disqusConfig}
            >
              0 Comments
            </Disqus.CommentCount>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
export default withStyles(styles, { withTheme: true })(
  withRouter(PublicPostItem)
);
