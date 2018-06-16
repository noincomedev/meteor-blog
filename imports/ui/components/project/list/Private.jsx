import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { PropTypes } from "prop-types";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import CardWithTitleAndContent from "../../../layouts/components/card/CardWithTitleAndContent";
import ProjectForm from "../ProjectForm";

import PrivateProjectItem from "./PrivateProjectItem";

const styles = theme => ({
  container: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
    overflow: "auto"
  }
});

class Private extends Component {
  state = {
    showButton: false,
    showForm: true
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
    if (nextProps.projects) {
      return {
        showButton: nextProps.projects.length > 0 ? true : false,
        showForm: nextProps.projects.length > 0 ? false : true
      };
    }
    return {
      ...nextProps
    };
  }

  render() {
    const { classes, projects } = this.props;
    const { showButton, showForm } = this.state;
    return (
      <Grid container className={classes.container} justify="center">
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={8}>
            <Typography variant="title" color="inherit">
              Work in Progress
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
          >
            {showButton && (
              <Button
                variant="flat"
                color="secondary"
                onClick={this.toggleButton}
                className={classes.button}
              >
                ADD PROJECT
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
              <title>NOINCOMEDEV | Create Project</title>
              <meta name="Add Project" content="Add Project" />
            </Helmet>
            <CardWithTitleAndContent title="Create Project">
              <ProjectForm handleCancel={this.toggleCancel} />
            </CardWithTitleAndContent>
          </Grid>
        )}
        <Grid container>
          <Grid item xs={12}>
            <List
              style={{ width: "100%" }}
              component="nav"
              subheader={
                <ListSubheader component="div">Projects</ListSubheader>
              }
            >
              {projects.map(project => (
                <PrivateProjectItem key={project._id} project={project} />
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Private.propTypes = {
  projects: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(Private);
