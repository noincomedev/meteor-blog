import React from "react";
import gql from "graphql-tag";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";

import PrivateList from "../../components/project/list/Private";

import Spinner from "../../components/utils/Spinner";

export const USER_PROJECTS = gql`
  query projects($owner: String!) {
    projects(owner: $owner) {
      _id
      owner
      status
      created
      updated
      name
      description
      imageUrl
      tag
    }
  }
`;

const syles = theme => ({});

const PrivateWipPage = ({ classes }) => (
  <Query query={USER_PROJECTS} variables={{ owner: Meteor.userId() }}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error!: ${error}`;
      if (data) return <PrivateList projects={data.projects} />;
    }}
  </Query>
);

PrivateWipPage.propTypes = {};

export default PrivateWipPage;
