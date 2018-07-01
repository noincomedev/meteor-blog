import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { PropTypes } from "prop-types";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import PublicProjectItem from "./PublicProjectItem";

import Spinner from "../../utils/Spinner";

const GET_PUBLIC_PROJECTS = gql`
  query publicProjects {
    publicProjects {
      _id
      name
      description
      imageUrl
      tag
      private
    }
  }
`;

export default (Public = ({ projects }) => (
  <Query query={GET_PUBLIC_PROJECTS}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error!: ${error}`;
      const { publicProjects } = data;
      return (
        <Grid container>
          <Grid item xs={12}>
            <List
              component="nav"
              subheader={
                publicProjects && (
                  <ListSubheader component="div">Projects</ListSubheader>
                )
              }
            >
              {publicProjects.length > 0 ? (
                <div>
                  {publicProjects.map(project => (
                    <PublicProjectItem key={project._id} project={project} />
                  ))}
                </div>
              ) : (
                <Typography variant="subheading">
                  Nothing at the moment
                </Typography>
              )}
            </List>
          </Grid>
        </Grid>
      );
    }}
  </Query>
));
