import React from "react";
import gql from "graphql-tag";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../../components/utils/Spinner";

styles = theme => ({});

const GET_PROJECT = gql`
  query project($_id: String!) {
    project(_id: $_id) {
      _id
      name
      description
      imageUrl
      tag
      private
    }
  }
`;

const Public = ({ classes, id }) => (
  <Query query={GET_PROJECT} variables={{ _id: id }}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error!: ${error}`;
      const { project } = data;
      return (
        <Grid container className={classes.container} justify="center">
          <header className={classes.header}>
            <Typography
              className={classes.title}
              variant="headline"
              color="inherit"
            >
              {project.name}
            </Typography>
          </header>
        </Grid>
      );
    }}
  </Query>
);

Public.propTypes = {
  id: PropTypes.string.isRequired
};

export default withStyles(styles)(Public);
