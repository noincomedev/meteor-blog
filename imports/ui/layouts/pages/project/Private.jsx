import React, { Component } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";

import PrivateTasksListLayout from "../../../layouts/components/list/PrivateTaskListLayout";
import ProjectForm from "../../../components/project/ProjectForm";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Settings from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../../components/utils/Spinner";

export const GET_PROJECT_TASKS = gql`
  query project($_id: String!) {
    project(_id: $_id) {
      _id
      name
      description
      imageUrl
      tag
      private
      tasks {
        _id
        owner
        status
        archived
        name
        description
        completed
      }
    }
  }
`;

const styles = theme => ({
  divider: {
    marginBottom: theme.spacing.unit
  },
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

class Private extends Component {
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
    const { classes } = this.props;
    const { controls } = this.state;
    return (
      <Query
        query={GET_PROJECT_TASKS}
        variables={{ _id: this.props.id }}
        pollInterval={500}
      >
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return `Error!: ${error}`;
          const { project } = data;
          return (
            <Grid container className={classes.container} justify="center">
              <header className={classes.header}>
                <Typography
                  className={classNames(!controls && classes.title)}
                  variant="headline"
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
                <Divider className={classes.divider} />
                {!controls &&
                  project && (
                    <ProjectForm
                      showCancelButton
                      project={project}
                      handleToggleControls={this.toggleControls}
                    />
                  )}
                {controls && <PrivateTasksListLayout tasks={project.tasks} />}
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

Private.propTypes = {
  id: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(Private);
