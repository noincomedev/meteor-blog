import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";

import PostEditor from "../post/PostEditor";

const GET_USER_POSTS = gql`
  query Posts($owner: String) {
    posts(owner: $owner) {
      _id
      title
      slug
      created
      updated
      published
    }
  }
`;

class PrivateList extends Component {
  state = {
    showForm: true
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    const { showForm } = this.state;
    return (
      <Query query={GET_USER_POSTS} variables={{ owner: Meteor.userId() }}>
        {({ loading, error, data }) => {
          if (loading) return <h1>LOADING</h1>;
          if (error) return `Error!: ${error}`;
          const { posts } = data;
          if (posts) this.toggleForm();
          return (
            <Fragment>
              <h1>User Posts</h1>
              {showForm && <PostEditor />}
              {posts ? (
                <h1>PostList</h1>
              ) : (
                <h3 style={{ color: "grey" }}>Empty List</h3>
              )}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

PrivateList.propTypes = {
  user: PropTypes.object.isRequired
};

export default PrivateList;
