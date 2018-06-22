import React, { Component } from "react";
import compose from "recompose/compose";
import { PropTypes } from "prop-types";

import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Archive from "@material-ui/icons/Archive";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  checkBox: {
    width: "100%",
    color: theme.palette.custom.text,
    "&$checked": {
      color: theme.palette.custom.text
    }
  },
  checked: {},
  done: {
    textDecoration: "line-through",
    color: theme.palette.grey[400]
  },
  archive: {
    color: theme.palette.grey[200],
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
  }
});

class PrivateTaskItem extends Component {
  state = {
    // hoverable: true,
    // showControls: false
  };

  onStatusChange = (event, checked) => {
    this.props.onToggleStatus(event.target.checked, this.props.task._id);
  };

  onArchiveClick = () => {
    this.props.onArchive(this.props.task._id);
  };

  // toggleControls = () => {
  //   if (this.state.hoverable)
  //     this.setState({ showControls: !this.state.showControls });
  // };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.width == "xs")
  //     return { hoverable: false, showControls: true };
  //   else return { ...nextProps, hoverable: true, showControls: false };
  // }

  render() {
    const { classes, task } = this.props;
    // const { hoverable, showControls } = this.state;
    return (
      <Grid container>
        <Grid item xs={1} classes={{ item: classes.item }}>
          <Checkbox
            classes={{ root: classes.checkbox, checked: classes.checked }}
            checked={!task.status}
            value="taskstatus"
            id="checkbox"
            className={classes.checkBox}
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            onChange={this.onStatusChange}
          />
        </Grid>
        <Grid item xs={9} classes={{ item: classes.item }}>
          <Typography
            classes={{ title: !task.status && classes.done }}
            variant="title"
          >
            {task.name}
          </Typography>
          <Typography variant="caption">{task.description}</Typography>
        </Grid>

        <Grid item xs={2} classes={{ item: classes.item }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Archive
              className={classes.archive}
              onClick={this.onArchiveClick}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
    );
  }
}

PrivateTaskItem.propTypes = {
  onToggleStatus: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};

export default compose(
  withWidth(),
  withStyles(styles, { withTheme: true })
)(PrivateTaskItem);
