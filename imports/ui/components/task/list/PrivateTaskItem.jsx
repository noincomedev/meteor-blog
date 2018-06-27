import React, { Component } from "react";
import gql from "graphql-tag";
import { Bert } from "meteor/themeteorchef:bert";
import { compose, graphql } from "react-apollo";
import { PropTypes } from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Archive from "@material-ui/icons/Archive";
import Done from "@material-ui/icons/Done";
import Edit from "@material-ui/icons/Edit";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Warning from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    width: 20,
    height: 20
  },
  avatarChild: {
    width: 10,
    height: 10
  },
  chip: {
    height: 20,
    fontSize: "0.5rem",
    marginLeft: theme.spacing.unit,
    justifyContent: "flex-start"
  },
  check: {
    color: theme.palette.custom.success,
    marginRight: theme.spacing.unit,
    fontSize: 36
  },
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
  edit: {
    color: theme.palette.grey[400],
    "&:hover": {
      color: theme.palette.custom.text
    }
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center"
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.15rem"
  },
  warning: {
    color: theme.palette.custom.error
  }
});

class PrivateTaskItem extends Component {
  onCheckboxChange = (event, checked) => {
    const variables = {
      _id: this.props.task._id,
      completed: event.target.checked
    };
    this.props.toggleTask({ variables }).then(
      Bert.alert({
        title: `${event.target.checked ? "Success!" : "Warning!"}`,
        message: `Task ${event.target.checked ? "complete" : "incomplete"}`,
        type: `${event.target.checked ? "success" : "warning"}`,
        style: "growl-top-right",
        icon: `${event.target.checked ? "fa-check" : "fa-info"}`
      })
    );
  };

  onArchiveClick = () => {
    const { _id } = this.props.task;
    const variables = { _id };
    this.props.archiveTask({ variables }).then(
      Bert.alert({
        title: "Warning!",
        message: "Task archived.",
        type: "warning",
        style: "growl-top-right",
        icon: "fa-warning"
      })
    );
  };

  onEditClick = () => {
    this.props.onToggleForm();
  };

  render() {
    const { classes, task } = this.props;
    return (
      <Grid container>
        {!task.archived ? (
          <Grid item xs={1} classes={{ item: classes.item }}>
            <Checkbox
              classes={{ root: classes.checkbox, checked: classes.checked }}
              checked={task.completed}
              value="taskstatus"
              id="checkbox"
              className={classes.checkBox}
              icon={<CheckBoxOutlineBlankIcon />}
              checkedIcon={<CheckBoxIcon />}
              onChange={this.onCheckboxChange}
            />
          </Grid>
        ) : (
          <Grid item xs={1} classes={{ item: classes.item }}>
            {task.completed ? (
              <Done className={classes.check} />
            ) : (
              <Warning className={classes.warning} />
            )}
          </Grid>
        )}
        <Grid item xs={9}>
          <div
            style={{
              display: task.archived && "inline-flex",
              alignItems: "center"
            }}
          >
            <Typography
              classes={{
                root: classes.title,
                body2: task.completed && classes.done
              }}
              variant="body2"
            >
              {task.name}
            </Typography>
            {task.archived ? (
              <Chip
                avatar={
                  <Avatar classes={{ root: classes.avatar }}>
                    <Archive className={classes.archived} />
                  </Avatar>
                }
                label="Archived"
                classes={{
                  root: classes.chip,
                  avatarChildren: classes.avatarChild
                }}
              />
            ) : (
              <Typography variant="caption">{task.description}</Typography>
            )}
          </div>
        </Grid>
        <Grid item xs={2} classes={{ item: classes.item }}>
          <Grid container justify="flex-end">
            {!task.archived && (
              <Archive
                className={classes.archive}
                onClick={this.onArchiveClick}
              />
            )}
            <Edit className={classes.edit} onClick={this.onEditClick} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
    );
  }
}

PrivateTaskItem.propTypes = {
  onToggleForm: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};

const ARCHIVE_TASK = gql`
  mutation archiveTask($_id: String!) {
    archiveTask(_id: $_id) {
      _id
    }
  }
`;

const TOGGLE_TASK = gql`
  mutation toggleTask($_id: String!, $completed: Boolean!) {
    toggleTask(_id: $_id, completed: $completed) {
      _id
    }
  }
`;

export default compose(
  graphql(ARCHIVE_TASK, { name: "archiveTask" }),
  graphql(TOGGLE_TASK, { name: "toggleTask" })
)(withStyles(styles, { withTheme: true })(PrivateTaskItem));
