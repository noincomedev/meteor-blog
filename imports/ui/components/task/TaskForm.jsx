import React, { Component } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { Bert } from "meteor/themeteorchef:bert";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import ValidatedForm from "../utils/ValidatedForm";

const styles = theme => ({
  textField: {
    marginTop: 0
  }
});

class TaskForm extends Component {
  constructor(props) {
    super(props);
    const { match, task } = props;
    this.state = {
      _id: task && task._id,
      archived: task ? task.archived : false,
      owner: task ? task.owner : match.params._id,
      name: task ? task.name : "",
      description: task ? task.description : ""
    };
  }

  handleCancel = () => {
    this.props.onToggleControls();
  };

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;
    this.setState({ [name]: value });
  };

  handleDelete = () => {
    const { client } = this.props;
    const { _id } = this.state;
    const variables = { _id };
    if (_id) {
      this.props
        .deleteTask({ variables })
        .then(
          Bert.alert({
            title: "Success",
            message: "Task deleted.",
            type: "danger",
            style: "growl-top-right",
            icon: "fa-remove"
          })
        )
        .then(this.props.onToggleControls())
        .catch(error =>
          Bert.alert({
            title: "Error!",
            message: "something went wrong",
            type: "danger",
            style: "growl-top-right",
            icon: "fa-remove"
          })
        );
    }
  };

  handleSubmit = () => {
    const { client } = this.props;
    const { _id, description, name, owner } = this.state;

    if (this.props.task) {
      this.props
        .editTask({ variables: { _id, description, name, owner } })
        .then(
          Bert.alert({
            title: "Success",
            message: "Task saved.",
            type: "success",
            style: "growl-top-right",
            icon: "fa-check"
          })
        )
        .catch(error =>
          Bert.alert({
            title: error ? "Error!" : "Success",
            message: error ? error.message : "Task saved",
            type: error ? "danger" : "success",
            style: "growl-top-right",
            icon: error ? "fa-remove" : "fa-check"
          })
        );
    } else {
      this.props
        .createTask({ variables: { description, name, owner } })
        .then(
          Bert.alert({
            title: "Success",
            message: "Task added.",
            type: "success",
            style: "growl-top-right",
            icon: "fa-check"
          })
        )
        .catch(error =>
          Bert.alert({
            title: error ? "Error!" : "Success",
            message: error ? error.message : "Task saved",
            type: error ? "danger" : "success",
            style: "growl-top-right",
            icon: error ? "fa-remove" : "fa-check"
          })
        );
    }
    this.props.onToggleControls();
  };

  render() {
    const { classes, showCancelButton, task } = this.props;
    const { archived, description, name } = this.state;
    return (
      <Grid container>
        <Card>
          <CardHeader title={`${task ? "Edit" : "Create"} Task`} />
          <Divider />
          <CardContent>
            <ValidatedForm onHandleSubmit={this.handleSubmit}>
              <TextField
                id="name"
                name="name"
                label="Name"
                className={classes.textField}
                value={name}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                required
                disabled={task ? task.archived : false}
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                rows={3}
                value={description}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                required
                multiline
                disabled={task ? task.archived : false}
              />
              <Grid container justify="center" spacing={8}>
                {showCancelButton && (
                  <Grid item xs={4}>
                    <Button
                      type="button"
                      variant="contained"
                      color="inherit"
                      fullWidth
                      onClick={this.handleCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                )}
                {task && (
                  <Grid item xs={4}>
                    <Button
                      type="button"
                      variant="raised"
                      color="secondary"
                      fullWidth
                      onClick={this.handleDelete}
                    >
                      Delete
                    </Button>
                  </Grid>
                )}
                {!archived && (
                  <Grid item xs={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {task ? "Save" : "Add"}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </ValidatedForm>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

TaskForm.propTypes = {
  onToggleControls: PropTypes.func.isRequired,
  showCancelButton: PropTypes.bool,
  task: PropTypes.object
};

const GET_TASKS = gql`
  query tasks($owner: String!) {
    tasks(owner: $owner) {
      _id
      owner
      status
      archived
      name
      description
      completed
    }
  }
`;

const CREATE_TASK = gql`
  mutation createTask($owner: String!, $name: String!, $description: String!) {
    createTask(owner: $owner, name: $name, description: $description) {
      _id
    }
  }
`;

const EDIT_TASK = gql`
  mutation editTask($_id: String!, $name: String!, $description: String!) {
    editTask(_id: $_id, name: $name, description: $description) {
      _id
    }
  }
`;

const DELETE_TASK = gql`
  mutation deleteTask($_id: String!) {
    deleteTask(_id: $_id) {
      _id
    }
  }
`;

export default compose(
  graphql(CREATE_TASK, {
    name: "createTask",
    options: {
      refetchQueries: ["projects"],
      variables: { owner: Meteor.userId() }
    }
  }),
  graphql(DELETE_TASK, {
    name: "deleteTask",
    options: {
      refetchQueries: ["projects"],
      variables: { owner: Meteor.userId() }
    }
  }),
  graphql(EDIT_TASK, {
    name: "editTask",
    options: {
      refetchQueries: ["projects"],
      variables: { owner: Meteor.userId() }
    }
  })
)(withStyles(styles, { withTheme: true })(withRouter(withApollo(TaskForm))));
