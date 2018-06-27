import React, { Component } from "react";
import gql from "graphql-tag";
import { Bert } from "meteor/themeteorchef:bert";
import { compose, graphql } from "react-apollo";
import { PropTypes } from "prop-types";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import EditableTaskItemLayout from "../../components/list/EditableTaskItemLayout";
import TaskForm from "../../../components/task/TaskForm";

const styles = theme => ({
  card: {
    width: "100%"
  },
  cardContent: {
    position: "relative",
    minHeight: "22vh",
    maxHeight: "33vh",
    overflow: "scroll"
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.light
  },
  header: {},
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  item: {
    position: "relative",
    width: "100%"
  },
  subheader: {
    color: theme.palette.common.white
  }
});

class PrivateTaskListLayout extends Component {
  constructor(props) {
    super(props);
    const { tasks } = props;
    this.state = {
      controls: tasks.length > 0
    };
  }

  handleArchive = _id => {
    const variables = { _id };
    this.props
      .archiveTask({ variables })
      .then(
        Bert.alert({
          title: "Warning!",
          message: "Task archived",
          type: "danger",
          style: "growl-top-right",
          icon: "fa-remove"
        })
      )
      .catch(error =>
        Bert.alert({
          title: "Warning!",
          message: "ERROR",
          type: "danger",
          style: "growl-top-right",
          icon: "fa-remove"
        })
      );
  };

  handleStatusChange = (status, _id) => {
    const variables = { _id, status };
    this.props
      .toggleTaskStatus({ variables })
      .then(
        Bert.alert({
          title: "Success",
          message: "Task updated.",
          type: "success",
          style: "growl-top-right",
          icon: "fa-check"
        })
      )
      .catch(error =>
        Bert.alert({
          title: error ? "Error!" : "Success",
          message: error ? error.message : "Project saved",
          type: error ? "danger" : "success",
          style: "growl-top-right",
          icon: error ? "fa-remove" : "fa-check"
        })
      );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tasks.length > 0 && this.props.tasks.length == 0)
      this.toggleControls();
  }

  toggleControls = () => {
    this.setState({ controls: !this.state.controls });
  };

  render() {
    const { classes, tasks } = this.props;
    const { controls } = this.state;
    return (
      <Grid container style={{ marginTop: 8 }} justify="center">
        {!controls && (
          <TaskForm
            onToggleControls={this.toggleControls}
            showCancelButton={tasks.length > 0}
          />
        )}
        {controls &&
          tasks.length > 0 && (
            <Grid item xs={12} sm={8} md={6} style={{ position: "relative" }}>
              <Card className={classes.card}>
                <CardHeader
                  classes={{
                    root: classes.cardHeader,
                    subheader: classes.subheader
                  }}
                  subheader="Tasks"
                />
                <CardContent classes={{ root: classes.cardContent }}>
                  {tasks.map(task => (
                    <EditableTaskItemLayout task={task} key={task._id} />
                  ))}
                </CardContent>
              </Card>
              {controls && (
                <Button
                  classes={{ mini: classes.fab }}
                  color="secondary"
                  variant="fab"
                  mini
                  onClick={this.toggleControls}
                >
                  +
                </Button>
              )}
            </Grid>
          )}
      </Grid>
    );
  }
}

PrivateTaskListLayout.propTypes = {
  tasks: PropTypes.array,
  projectId: PropTypes.string
};

const TOGGLE_TASK_STATUS = gql`
  mutation toggleTaskStatus($_id: String!, $status: Boolean!) {
    toggleTaskStatus(_id: $_id, status: $status) {
      status
    }
  }
`;

const ARCHIVE_TASK = gql`
  mutation archiveTask($_id: String!) {
    archiveTask(_id: $_id) {
      status
    }
  }
`;

export default compose(
  graphql(TOGGLE_TASK_STATUS, {
    name: "toggleTaskStatus",
    options: {
      refetchQueries: ["tasks"],
      variables: { owner: Meteor.userId() }
    }
  }),
  graphql(ARCHIVE_TASK, {
    name: "archiveTask",
    options: {
      refetchQueries: ["tasks"],
      variables: { owner: Meteor.userId() }
    }
  })
)(withStyles(styles)(PrivateTaskListLayout));
