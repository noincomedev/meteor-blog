import React, { Component, Fragment } from "react";
import { PropTypes } from "prop-types";
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
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "material-ui/styles";

import { createSvgIcon } from "@material-ui/icons/utils/createSvgIcon";

import FiberNew from "@material-ui/icons/FiberNew";
import CalendarToday from "../../../assets/icons/CalendarToday";

const styles = theme => ({
  actionButton: { marginLeft: "auto" },
  avatar: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.common.white
  },
  cardActions: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  chip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.light
  },
  container: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
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
  life: { backgroundColor: theme.palette.custom.success },
  react: { backgroundColor: theme.palette.custom.text },
  text: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit / 2
  },
  tagsContainer: { marginTop: theme.spacing.unit }
});

class PublicList extends Component {
  render() {
    const { classes, posts } = this.props;
    return (
      <Grid container className={classes.container} spacing={16}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card>
              <Hidden xsDown>
                <CardMedia
                  className={classes.media}
                  image={
                    post.imgUrl
                      ? post.imgUrl
                      : "http://via.placeholder.com/350x150"
                  }
                  src="image"
                  title={post.title}
                />
              </Hidden>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {post.title}
                </Typography>
                <Divider className={classes.divider} light />
                <Typography component="p">{post.intro}</Typography>
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
              </CardContent>
              <CardActions
                className={
                  post.category ? classes[post.category] : classes.cardActions
                }
              >
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
                  color="inherit"
                  to={`/posts/${post.slug}`}
                >
                  Continue Reading
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

PublicList.propTypes = {
  posts: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(PublicList);
