import React, { Component } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Redirect, withRouter } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Settings from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";

import ProjectForm from "../components/project/ProjectForm";

import Spinner from "../components/utils/Spinner";

export const GET_PROJECT = gql`
  query Project($_id: String!) {
    project(_id: $_id) {
      _id
      name
      description
      imageUrl
      tag
    }
  }
`;

const styles = theme => ({
  header: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    marginBottom: theme.spacing.unit / 2
  }
});

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: true
    };
  }

  toggleControls = () => {
    this.setState({ controls: !this.state.controls });
  };

  render() {
    const { classes, match, project } = this.props;
    const { controls } = this.state;
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
              <header className={classes.header}>
                <Typography
                  className={classNames(!controls && classes.title)}
                  variant="title"
                  color="inherit"
                >
                  {project.name}
                </Typography>
                {controls && (
                  <IconButton color="secondary" onClick={this.toggleControls}>
                    <Settings />
                  </IconButton>
                )}
              </header>
              <Grid item xs={12}>
                <Divider />
                {!controls &&
                  project && (
                    <ProjectForm
                      showCancelButton
                      project={project}
                      handleToggleControls={this.toggleControls}
                    />
                  )}
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(ProjectPage));
