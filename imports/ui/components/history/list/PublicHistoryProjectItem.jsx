import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddAlert from "@material-ui/icons/AddAlert";
import Warning from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  chipContainer: {
    alignSelf: "flex-end"
  }
});

const PublicHistoryProjectItem = ({ classes, history }) => (
  <Grid item xs={12} style={{ display: "inline-flex" }}>
    <Typography variant="subheading" color="primary" style={{ marginRight: 8 }}>
      {`${history.action} project`}
    </Typography>
    <Typography
      variant="body2"
      color="secondary"
      component={Link}
      to={`/projects/${history.project._id}`}
    >
      {history.project.name}
    </Typography>
  </Grid>
);

PublicHistoryProjectItem.propTypes = {
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(PublicHistoryProjectItem);
