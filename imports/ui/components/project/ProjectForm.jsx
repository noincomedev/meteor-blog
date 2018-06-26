import React, { Component } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { Bert } from "meteor/themeteorchef:bert";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import ValidatedForm from "../utils/ValidatedForm";

const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $imageUrl: String!
    $tag: String!
  ) {
    createProject(
      name: $name
      description: $description
      imageUrl: $imageUrl
      tag: $tag
    ) {
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
    $tag: String!
  ) {
    editProject(
      _id: $_id
      name: $name
      description: $description
      imageUrl: $imageUrl
      tag: $tag
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
    marginTop: theme.spacing.unit
  },
  textField: {
    marginTop: 0
  }
});

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    const { project } = props;
    this.state = {
      name: project ? project.name : "",
      description: project ? project.description : "",
      imageUrl: project ? project.imageUrl : "",
      tag: project ? project.tag : "",
      _id: project ? project._id : ""
    };
  }

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { history } = this.props;
    const { _id, name, description, imageUrl, tag } = this.state;
    const variables = { _id, name, description, imageUrl, tag };
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
          variables: { name, description, imageUrl, tag }
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
    this.props.handleToggleControls();
  };

  handleCancel = () => {
    this.props.handleToggleControls();
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
    this.props.handleToggleControls();
  };

  render() {
    const { classes, project, showCancelButton } = this.props;
    const { _id, name, imageUrl, description, tag } = this.state;
    return (
      <Grid
        container
        classes={{ container: classes.container }}
        justify="center"
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`${project ? "Edit" : "Create"} Project`} />
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
                <TextField
                  id="tag"
                  label="TAG"
                  value={tag}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                  required
                />
                <Grid container justify="center" spacing={8}>
                  <Grid item xs={4}>
                    {showCancelButton && (
                      <Button
                        type="button"
                        variant="contained"
                        color="inherit"
                        fullWidth
                        onClick={this.handleCancel}
                      >
                        Cancel
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {project && (
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={this.handleDelete}
                      >
                        Delete
                      </Button>
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {project ? "Save" : "Create"}
                    </Button>
                  </Grid>
                </Grid>
              </ValidatedForm>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

ProjectForm.propTypes = {
  handleToggleControls: PropTypes.func.isRequired,
  project: PropTypes.object,
  showCancelButton: PropTypes.bool
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
