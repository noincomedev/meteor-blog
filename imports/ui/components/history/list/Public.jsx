import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import PublicHistoryItemLayout from "../../../layouts/components/list/PublicHistoryItemLayout";

import Spinner from "../../utils/Spinner";

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    minHeight: "10vh",
    maxHeight: "22vh",
    overflow: "auto"
  }
});

const Public = ({ classes }) => (
  <Query query={GET_PUBLIC_HISTORY}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error!: ${error}`;
      const { publicHistory } = data;
      return (
        <Grid container classes={{ container: classes.container }}>
          {publicHistory.map(history => (
            <PublicHistoryItemLayout key={history._id} history={history} />
          ))}
        </Grid>
      );
    }}
  </Query>
);

const GET_PUBLIC_HISTORY = gql`
  query publicHistory {
    publicHistory {
      _id
      action
      type
      project {
        _id
        name
      }
      task {
        tag
        owner
      }
    }
  }
`;

export default withStyles(styles)(Public);
