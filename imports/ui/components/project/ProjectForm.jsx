import React, { Component } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { Bert } from "meteor/themeteorchef:bert";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import ValidatedForm from "../utils/ValidatedForm";

const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $imageUrl: String!
  ) {
    createProject(name: $name, description: $description, imageUrl: $imageUrl) {
      _id
    }
  }
`;

const EDIT_PROJECT = gql`
  mutation editProject(
    $_id: String!
    $name: String!
    $description: String!
    $imageUrl: String!
  ) {
    editProject(
      _id: $_id
      name: $name
      description: $description
      imageUrl: $imageUrl
    ) {
      _id
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($_id: String!) {
    deleteProject(_id: $_id) {
      _id
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    overflow: "auto"
  },
  textField: {
    marginTop: 0
  }
});

class ProjectForm extends Component {
  state = {
    name: "",
    description: "",
    imageUrl: ""
  };

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { history } = this.props;
    const { _id, name, description, imageUrl } = this.state;
    const variables = { _id, name, description, imageUrl };
    if (_id) {
      this.props
        .editProject({ variables })
        .then(
          Bert.alert({
            title: "Success",
            message: "Project saved.",
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
    } else {
      this.props
        .createProject({
          variables: { name, description, imageUrl }
        })
        .then(
          Bert.alert({
            title: "Success",
            message: "Project created.",
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
    }
  };

  handleCancel = () => {
    this.props.handleCancel();
  };

  handleDelete = () => {
    const { _id } = this.state;
    const { history } = this.props;
    const variables = { _id };
    if (_id) {
      this.props
        .deleteProject({ variables })
        .then(
          Bert.alert({
            title: "Success",
            message: "Project deleted.",
            type: "danger",
            style: "growl-top-right",
            icon: "fa-remove"
          })
        )
        .then(history.push("/wip"))
        .catch(error =>
          Bert.alert({
            title: error ? "Error!" : "Success",
            message: error ? error.message : "Project deleted",
            type: error ? "danger" : "success",
            style: "growl-top-right",
            icon: error ? "fa-remove" : "fa-check"
          })
        );
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.project) {
      return {
        ...nextProps.project
      };
    }
    return {
      ...nextProps
    };
  }

  render() {
    const { classes } = this.props;
    const { _id, name, imageUrl, description } = this.state;
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
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
              value={description}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              id="imageUrl"
              label="Image URL"
              value={imageUrl ? imageUrl : ""}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              required
              type="url"
            />
            <Grid container justify="center">
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                  fullWidth
                >
                  {_id ? "Save" : "Create"}
                </Button>
                {_id && (
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
        </Grid>
      </Grid>
    );
  }
}

ProjectForm.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  project: PropTypes.object
};

export default compose(
  graphql(EDIT_PROJECT, {
    name: "editProject",
    options: {
      refetchQueries: ["projects"],
      variables: { owner: Meteor.userId() }
    }
  }),
  graphql(DELETE_PROJECT, {
    name: "deleteProject",
    options: {
      refetchQueries: ["projects"],
      variables: { owner: Meteor.userId() }
    }
  }),
  graphql(CREATE_PROJECT, {
    name: "createProject",
    options: {
      refetchQueries: ["projects"],
      variables: { owner: Meteor.userId() }
    }
  })
)(withRouter(withStyles(styles)(ProjectForm)));