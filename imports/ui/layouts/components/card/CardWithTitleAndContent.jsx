import React from "react";

import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    minWidth: 275
  },
  cardContent: {
    minHeigh: 500
  },
  divider: {
    marginLeft: 24,
    marginRight: 24
  },
  title: {
    fontSize: 14
  }
});

const CardWithTitleAndContent = ({ children, content, classes, title }) => (
  <Card className={classes.card}>
    <CardHeader className={classes.title} title={title} />
    <Divider className={classes.divider} />
    <CardContent className={classes.cardContent}>{children}</CardContent>
  </Card>
);

export default withStyles(styles, { withTheme: true })(CardWithTitleAndContent);
