import React from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = theme => ({
  media: {
    [theme.breakpoints.up("md")]: {
      height: "25vh"
    },
    [theme.breakpoints.down("sm")]: {
      height: "33vh"
    }
  }
});

const CardWithImage = ({ children, classes, imageUrl, title }) => (
  <Card>
    <CardMedia
      className={classes.media}
      image={imageUrl ? imageUrl : "http://via.placeholder.com/350x150"}
      src="image"
      title={title}
    />
    <CardContent style={{ paddingTop: 0 }}>{children}</CardContent>
  </Card>
);

export default withStyles(styles, { withTheme: true })(CardWithImage);
