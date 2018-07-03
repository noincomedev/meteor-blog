import React from "react";
import gql from "graphql-tag";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../../components/utils/Spinner";

styles = theme => ({
  activeCard: {
    backgroundColor: theme.palette.primary.light
  },
  avatar: {
    width: 100,
    height: 100,
    border: `3px solid ${theme.palette.custom.text}`,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.down("xs")]: {
      width: 50,
      height: 50
    }
  },
  cardContent: {
    paddingBottom: `${theme.spacing.unit * 2}px !important`
  },
  cardSubheader: {
    color: theme.palette.common.white
  },
  completedCard: {
    backgroundColor: theme.palette.custom.success
  },
  container: {},
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.secondary.light
  },
  title: {
    color: theme.palette.primary.main
  },
  totalCard: {
    backgroundColor: theme.palette.custom.text
  }
});

const GET_PROJECT = gql`
  query project($_id: String!) {
    project(_id: $_id) {
      _id
      name
      description
      imageUrl
      tag
      private
      tasksCount
      completedTasksCount
      activeTasksCount
    }
  }
`;

const Public = ({ classes, history, id }) => (
  <Query query={GET_PROJECT} variables={{ _id: id }}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error!: ${error}`;
      const { project } = data;
      if (project.private) history.push("/");
      return (
        <Grid
          justify="center"
          classes={{ container: classes.container }}
          container
        >
          <Grid item xs={12}>
            <header className={classes.header}>
              <Avatar
                classes={{ root: classes.avatar }}
                src={project.imageUrl}
              />
              <div>
                <Typography
                  className={classes.title}
                  variant="display3"
                  color="inherit"
                  align="center"
                >
                  {project.name}
                </Typography>
                <Typography variant="caption" color="default" align="center">
                  {project.description}
                </Typography>
              </div>
            </header>
          </Grid>
          <Grid
            container
            direction="column"
            wrap="nowrap"
            style={{ padding: 24 }}
          >
            <Grid item xs={4} style={{ maxHeight: 40 }}>
              <Typography variant="headline">Tasks</Typography>
              <Divider />
            </Grid>
            <Grid container style={{ padding: 8 }} spacing={16}>
              <Grid item xs={12} sm={4}>
                <Card classes={{ root: classes.totalCard }}>
                  <CardHeader
                    classes={{ subheader: classes.cardSubheader }}
                    subheader="total"
                  />
                  <CardContent classes={{ root: classes.cardContent }}>
                    <Typography variant="display4" align="center">
                      {project.tasksCount}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card classes={{ root: classes.completedCard }}>
                  <CardHeader
                    classes={{ subheader: classes.cardSubheader }}
                    subheader="Completed"
                  />
                  <CardContent classes={{ root: classes.cardContent }}>
                    <Typography variant="display4" align="center">
                      {project.completedTasksCount}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card classes={{ root: classes.activeCard }}>
                  <CardHeader
                    classes={{ subheader: classes.cardSubheader }}
                    subheader="Active"
                  />
                  <CardContent classes={{ root: classes.cardContent }}>
                    <Typography variant="display4" align="center">
                      {project.activeTasksCount}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }}
  </Query>
);

Public.propTypes = {
  id: PropTypes.string.isRequired
};

export default withStyles(styles)(withRouter(Public));
