import React, { Component } from "react";
import compose from "recompose/compose";
import { PropTypes } from "prop-types";

import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Delete from "@material-ui/icons/Delete";
import NotInterested from "@material-ui/icons/NotInterested";
import { withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  delete: {
    color: theme.palette.grey[300],
    "&:hover": {
      color: theme.palette.custom.error
    }
  },
  divider: { marginTop: theme.spacing.unit, marginBottom: theme.spacing.unit },
  item: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center"
  },
  skip: {
    color: theme.palette.grey[300],
    "&:hover": {
      color: theme.palette.custom.text
    }
  }
});

class PrivateTaskItem extends Component {
  state = {
    showControls: false
  };

  toggleControls = () => {
    this.setState({ showControls: !this.state.showControls });
  };

  render() {
    const { classes, task } = this.props;
    const { showControls } = this.state;
    return (
      <Grid
        container
        onMouseLeave={this.toggleControls}
        onMouseEnter={this.toggleControls}
      >
        {showControls && (
          <Grid item xs={1} classes={{ item: classes.item }}>
            <Checkbox
              className={classes.size}
              icon={<CheckBoxOutlineBlankIcon className={classes.sizeIcon} />}
              checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />}
              value="checkedI"
            />
          </Grid>
        )}
        <Grid item xs={showControls ? 9 : 12} classes={{ item: classes.item }}>
          <Typography variant="title">{task.name}</Typography>
          {showControls && (
            <Typography variant="caption">{task.description}</Typography>
          )}
        </Grid>
        {showControls && (
          <Grid item xs={2} classes={{ item: classes.item }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <NotInterested className={classes.skip} />
              <Delete className={classes.delete} />
            </div>
          </Grid>
        )}
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
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

export default compose(
  withWidth(),
  withStyles(styles, { withTheme: true })
)(PrivateTaskItem);
