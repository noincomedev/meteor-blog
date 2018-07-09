import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  chipContainer: {
    alignSelf: "flex-end"
  }
});

const PublicHistoryPostItem = ({ classes, history }) => (
  <Grid item xs={12} style={{ display: "inline-flex" }}>
    <Typography variant="subheading" color="primary" style={{ marginRight: 8 }}>
      {`${history.action == "public" ? "unhide" : "hide"} post`}
    </Typography>
  </Grid>
);

PublicHistoryPostItem.propTypes = {
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(PublicHistoryPostItem);
