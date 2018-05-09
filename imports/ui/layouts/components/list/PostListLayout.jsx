import React from "react";
import gql from "graphql-tag";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";

import PrivateList from "../../../components/list/PrivateList";
import PublicList from "../../../components/list/PublicList";

export const USER_POSTS = gql`
  query posts($owner: String!) {
    posts(owner: $owner) {
      _id
      title
      published
      slug
    }
  }
`;

const PUBLIC_POSTS = gql`
  query publicPosts {
    publicPosts {
      _id
      title
      slug
      content
      tags
    }
  }
`;

const PostListLayout = ({ user }) =>
  user ? (
    <Query query={USER_POSTS} variables={{ owner: Meteor.userId() }}>
      {({ loading, error, data }) => {
        if (loading) return <h1>LOADING</h1>;
        if (error) return `Error!: ${error}`;
        if (data) return <PrivateList user={user} posts={data.posts} />;
      }}
    </Query>
  ) : (
    <Query query={PUBLIC_POSTS}>
      {({ loading, error, data }) => {
        if (loading) return <h1>LOADING</h1>;
        if (error) return `Error!: ${error}`;
        if (data) return <PublicList posts={data.publicPosts} />;
      }}
    </Query>
  );

PostListLayout.propTypes = {
  user: PropTypes.object
};

export default PostListLayout;
