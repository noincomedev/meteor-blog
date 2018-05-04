import React, { Component } from "react";
import gql from "graphql-tag";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";

const GET_USER_POSTS = gql`
  query Posts {
    posts {
      _id
    }
  }
`;

class PrivateList extends Component {
  render() {
    return (
      <Query query={GET_USER_POSTS} variables={{}}>
        {({ loading, error, data }) => {
          if (loading) return <h1>LOADING</h1>;
          if (error) return `Error!: ${error}`;
          console.log(data);
          return <h1>PrivateList</h1>;
        }}
      </Query>
    );
  }
}

PrivateList.propTypes = {
  user: PropTypes.object.isRequired
};

export default PrivateList;
