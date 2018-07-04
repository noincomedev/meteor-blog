import React from "react";
import { PropTypes } from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

const PublicHistoryProjectItem = ({ history }) => {
  return (
    <Grid item xs={12}>
      <Typography variant="subheading" color="primary">
        {history.action}
      </Typography>
      <Typography variant="title" color="secondary">
        {history.project.name}
      </Typography>
    </Grid>
  );
};

PublicHistoryProjectItem.propTypes = {
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(PublicHistoryProjectItem);
