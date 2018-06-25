import React, { Component } from "react";
import classNames from "classnames";
import { PropTypes } from "prop-types";

import Add from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import PrivateProjectItem from "./PrivateProjectItem";
import ProjectForm from "../ProjectForm";

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

class Private extends Component {
  constructor(props) {
    super(props);
    const { projects } = props;
    this.state = {
      controls: projects.length > 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.projects.length > 0 && this.props.projects.length == 0) {
      this.toggleControls();
    }
  }

  toggleControls = () => {
    this.setState({ controls: !this.state.controls });
  };

  render() {
    const { classes, projects } = this.props;
    const { controls } = this.state;
    return (
      <Grid container>
        <header className={classes.header}>
          <Typography
            className={classNames(!controls && classes.title)}
            variant="title"
            color="inherit"
          >
            Work in Progress
          </Typography>
          {controls && (
            <IconButton color="secondary" onClick={this.toggleControls}>
              <Add />
            </IconButton>
          )}
        </header>
        <Grid item xs={12}>
          <Divider />
          {!controls && (
            <ProjectForm
              handleToggleControls={this.toggleControls}
              showCancelButton={projects.length > 0}
            />
          )}
          {controls &&
            projects.length > 0 && (
              <List
                component="nav"
                subheader={
                  <ListSubheader component="div">Projects</ListSubheader>
                }
              >
                {projects.map(project => (
                  <PrivateProjectItem key={project._id} project={project} />
                ))}
              </List>
            )}
        </Grid>
      </Grid>
    );
  }
}

Private.propTypes = {
  projects: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(Private);
