import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import CardWithTitleAndContent from "../../../layouts/components/card/CardWithTitleAndContent";

const styles = theme => ({});

const PrivatePostItem = ({ classes, history, post }) => (
  <CardWithTitleAndContent title={post.title} hoverable>
    <Typography gutterBottom variant="caption">
      created: {moment(post.created).format("MMMM Do YYYY, h:mm:ss a")}
    </Typography>
    <Typography gutterBottom variant="caption">
      updated: {moment(post.updated).format("MMMM Do YYYY, h:mm:ss a")}
    </Typography>
    <Button
      fullWidth
      variant="flat"
      color="secondary"
      component={Link}
      to={`/posts/${post.slug}`}
    >
      Edit
    </Button>
  </CardWithTitleAndContent>
);

export default withStyles(styles, { withTheme: true })(
  withRouter(PrivatePostItem)
);
