import React, { Component } from "react";
import { PropTypes } from "prop-types";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import PrivateTaskItem from "../../../components/task/list/PrivateTaskItem";
import TaskForm from "../../../components/task/TaskForm";

const styles = theme => ({
  card: {
    zIndex: 1,
    position: "relative",
    maxHeight: "50vh",
    overflow: "auto"
  },
  content: {
    paddingTop: theme.spacing.unit * 8
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    position: "fixed",
    width: "100%"
  },
  fab: {
    position: "absolute",
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,
    zIndex: 2
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
  state = {};

  handleArchive = id => {
    console.log(`archive ${id}`);
  };

  handleComplete = id => {
    console.log(`complete ${id}`);
  };

  handlePospone = id => {
    console.log(`pospone ${id}`);
  };

  handleToggleState = () => {
    this.setState({
      showButton: !this.state.showButton,
      showForm: !this.state.showForm
    });
  };

  onFabClick = () => {
    this.setState({
      showButton: !this.state.showButton,
      showForm: !this.state.showForm
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tasks) {
      return {
        showButton: nextProps.tasks.length > 0 ? true : false,
        showForm: nextProps.tasks.length > 0 ? false : true
      };
    }
    return { ...nextProps };
  }

  render() {
    const { classes, tasks, projectId } = this.props;
    const { showButton, showForm } = this.state;
    return (
      <Grid
        container
        style={{ marginTop: 8 }}
        direction="column"
        alignItems="center"
      >
        {showForm && (
          <TaskForm
            projectId={projectId}
            onToggleState={this.handleToggleState}
          />
        )}
        {tasks.length == 0 &&
          !showForm && (
            <Typography
              style={{ marginTop: 8 }}
              variant="headline"
              color="inherit"
            >
              Nothing to list here!
            </Typography>
          )}
        {!showForm && (
          <Grid item classes={{ item: classes.item }} xs={12} md={6}>
            <Card
              className={classes.card}
              onMouseLeave={this.toggleRaised}
              onMouseEnter={this.toggleRaised}
            >
              <CardHeader
                classes={{ root: classes.header, subheader: classes.subheader }}
                subheader="Tasks"
              />
              <CardContent classes={{ root: classes.content }}>
                {tasks.map(task => (
                  <PrivateTaskItem
                    key={task._id}
                    onComplete={this.handleComplete}
                    onPospone={this.handlePospone}
                    onArchive={this.handleArchive}
                    task={task}
                  />
                ))}
              </CardContent>
            </Card>
            {showButton && (
              <Button
                classes={{ fab: classes.fab }}
                mini
                variant="fab"
                color="secondary"
                type="button"
                onClick={this.onFabClick}
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

export default withStyles(styles, { withTheme: true })(PrivateTaskListLayout);
