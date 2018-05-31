import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

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
  actionButton: { marginLeft: "auto" },
  avatar: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.common.white
  },
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flex: 1,
    justifyContent: "stretch"
  },
  cardActions: {
    backgroundColor: theme.palette.primary.main,
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
  tagsContainer: { marginTop: theme.spacing.unit },
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

  render() {
    const { classes, post } = this.props;
    const { raised } = this.state;
    return (
      <Grid item xs={12} sm={6} md={4} className={classes.item}>
        <Card
          className={classes.card}
          raised={raised}
          onMouseLeave={this.toggleRaised}
          onMouseEnter={this.toggleRaised}
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
            style={{ display: "flex", flexDirection: "column", flex: 1 }}
          >
            <Typography gutterBottom variant="headline" component="h2">
              {post.title}
            </Typography>
            <Divider className={classes.divider} light />
            <ReactMarkdown
              skipHtml
              className={classes.markdown}
              source={post.intro}
            />
            <div className={classes.tagsContainer}>
              <Typography className={classes.text} component="p">
                TAGS:
              </Typography>
              {post.tags.map((tag, index) => (
                <Chip key={index} label={`#${tag}`} className={classes.tag} />
              ))}
            </div>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Chip
              label={
                post.new
                  ? moment(post.created)
                      .startOf("day")
                      .fromNow()
                  : moment(post.created).format("LL")
              }
              avatar={
                <Avatar className={classes.avatar}>
                  {post.new ? <FiberNew /> : <CalendarToday />}
                </Avatar>
              }
              className={classes.chip}
            />
            <Button
              className={classes.actionButton}
              size="small"
              component={Link}
              color="secondary"
              to={`/posts/${post.slug}`}
              variant="flat"
            >
              Continue Reading
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PublicPostItem);
