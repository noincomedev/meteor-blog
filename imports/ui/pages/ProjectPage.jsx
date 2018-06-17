import React, { Component } from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { Query } from "react-apollo";
import { Redirect, withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Settings from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";
import CardWithTitleAndContent from "../layouts/components/card/CardWithTitleAndContent";
import ProjectForm from "../components/project/ProjectForm";

export const GET_PROJECT = gql`
  query Project($_id: String!) {
    project(_id: $_id) {
      _id
      name
      description
      imageUrl
    }
  }
`;

const styles = theme => ({});

class ProjectPage extends Component {
  state = {
    showButton: true,
    showForm: false
  };

  toggleButton = () => {
    this.setState({
      showButton: !this.state.showButton,
      showForm: !this.state.showForm
    });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  toggleCancel = () => {
    this.setState({
      showButton: !this.state.showButton,
      showForm: !this.state.showForm
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...nextProps
    };
  }

  render() {
    const { showButton, showForm } = this.state;
    const { classes, match, project } = this.props;
    const { params } = match;
    const { _id } = params;

    return (
      <Query query={GET_PROJECT} variables={{ _id }}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <Redirect to="/" />;
          const { project } = data;
          return (
            <Grid container className={classes.container} justify="center">
              <Grid container alignItems="center" className={classes.container}>
                <Grid item xs={8}>
                  <Typography variant="title" color="inherit">
                    {project.name}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  {showButton && (
                    <Button
                      variant="flat"
                      color="secondary"
                      onClick={this.toggleButton}
                      className={classes.button}
                    >
                      <Settings color="inherit" />
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {showForm && (
                <Grid item xs={12} style={{ paddingRight: 8 }}>
                  <Helmet>
                    <title>NOINCOMEDEV | {project.name}</title>
                    <meta name="Edit Project" content="Edit Project" />
                  </Helmet>
                  <CardWithTitleAndContent title="Project Settings">
                    <ProjectForm
                      project={project}
                      handleCancel={this.toggleCancel}
                    />
                  </CardWithTitleAndContent>
                </Grid>
              )}
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(ProjectPage));
