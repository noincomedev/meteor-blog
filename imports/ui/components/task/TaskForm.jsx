import React, { Component } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { Bert } from "meteor/themeteorchef:bert";
import { Helmet } from "react-helmet";
import { PropTypes } from "prop-types";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import CardWithTitleAndContent from "../../layouts/components/card/CardWithTitleAndContent";
import ValidatedForm from "../utils/ValidatedForm";

const CREATE_TASK = gql`
  mutation createTask($owner: String!, $name: String!, $description: String!) {
    createTask(owner: $owner, name: $name, description: $description) {
      _id
    }
  }
`;

const EDIT_TASK = gql`
  mutation editTask($_id: String!, $name: String!, $description: String!) {
    editProject(_id: $_id, name: $name, description: $description) {
      _id
    }
  }
`;

const styles = theme => ({
  textField: {
    marginTop: 0
  }
});

class TaskForm extends Component {
  state = {
    name: "",
    description: ""
  };

  handleCancel = () => {
    this.props.onToggleState();
  };

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;
    this.setState({ [name]: value });
  };

  handleDelete = () => {};

  handleSubmit = () => {
    const { task, projectId } = this.props;
    const { _id, name, description } = this.state;
    if (task) {
      this.props
        .editTask({ variables: { _id, name, description } })
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
      this.props.onToggleState();
    } else {
      this.props
        .createTask({
          variables: { owner: projectId, name, description }
        })
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
      this.props.onToggleState();
    }
  };

  render() {
    const { classes, onCancel, task } = this.props;
    const { description, name } = this.state;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Helmet>
            <title>NOINCOMEDEV | {task ? "Edit" : "Add"} Task</title>
            <meta
              name={`${task ? "Edit" : "Add"} Task`}
              content={`${task ? "Edit" : "Add"} Task`}
            />
          </Helmet>
          <CardWithTitleAndContent title={`${task ? "Edit" : "Add"} Task`}>
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
              />
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="raised"
                    color="primary"
                    fullWidth
                  >
                    {task ? "Save" : "Add"}
                  </Button>
                  {task && (
                    <Button
                      type="button"
                      variant="raised"
                      color="secondary"
                      fullWidth
                      onClick={this.handleDelete}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="raised"
                    color="inherit"
                    fullWidth
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </ValidatedForm>
          </CardWithTitleAndContent>
        </Grid>
      </Grid>
    );
  }
}

TaskForm.propTypes = {
  onToggleState: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired
};

export default compose(
  graphql(
    CREATE_TASK,
    {
      name: "createTask",
      options: {
        refetchQueries: ["projects"],
        variables: { owner: Meteor.userId() }
      }
    },
    graphql(EDIT_TASK, {
      name: "editTask",
      options: {
        refetchQueries: ["projects"],
        variables: { owner: Meteor.userId() }
      }
    })
  )
)(withStyles(styles, { withTheme: true })(TaskForm));
