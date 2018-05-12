import React from "react";

import Divider from "material-ui/Divider";
import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";

import { withStyles } from "material-ui/styles";

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

const withTitleAndContent = ({ content, classes, title }) => {
  return (
    <Card className={classes.card}>
      <CardHeader className={classes.title} title={title} />
      <Divider className={classes.divider} />
      <CardContent className={classes.cardContent}>
        {React.createElement(content)}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(withTitleAndContent);
