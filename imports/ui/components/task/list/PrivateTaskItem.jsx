import React, { Component } from "react";
import { PropTypes } from "prop-types";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  divider: { marginTop: theme.spacing.unit, marginBottom: theme.spacing.unit }
});

class PrivateTaskItem extends Component {
  render() {
    const { classes, task } = this.props;
    return (
      <Grid container direction="column" justify="center">
        <Typography variant="title">{task.name}</Typography>
        <Typography variant="caption">{task.description}</Typography>
        <Divider className={classes.divider} />
      </Grid>
    );
  }
}

PrivateTaskItem.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onPospone: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PrivateTaskItem);
