import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

const PublicHistoryTaskItem = ({ history }) => (
  <Grid item xs={12} style={{ display: "inline-flex" }}>
    <Typography variant="subheading" color="primary" style={{ marginRight: 8 }}>
      {`${history.action} task`}
    </Typography>
    <Typography
      variant="body2"
      color="secondary"
      component={Link}
      to={`/projects/${history.task.owner}`}
    >
      {history.task.tag}
    </Typography>
  </Grid>
);

PublicHistoryTaskItem.propTypes = {
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(PublicHistoryTaskItem);
