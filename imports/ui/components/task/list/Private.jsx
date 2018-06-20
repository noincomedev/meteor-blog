import React from "react";
import gql from "graphql-tag";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";

import { withStyles } from "@material-ui/core/styles";

import PrivateTaskListLayout from "../../../layouts/components/list/PrivateTaskListLayout";
import Spinner from "../../utils/Spinner";

const styles = theme => ({});

export const GET_PROJECT_TASKS = gql`
  query tasks($owner: String!) {
    tasks(owner: $owner) {
      _id
      name
      description
      tag
    }
  }
`;

const Private = ({ projectId }) => {
  return (
    <Query
      query={GET_PROJECT_TASKS}
      pollInterval={500}
      variables={{ owner: projectId }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error!: ${error}`;
        const { tasks } = data;
        return <PrivateTaskListLayout projectId={projectId} tasks={tasks} />;
      }}
    </Query>
  );
};

Private.propTypes = {
  projectId: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(Private);
