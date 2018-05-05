import React from "react";
import gql from "graphql-tag";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import PostForm from "./PostForm";

const GET_POST = gql`
  query Post($slug: String!) {
    post(slug: $slug) {
      _id
    }
  }
`;

const PostEditor = ({ slug }) => {
  return (
    <Query query={GET_POST} variables={{ slug: slug ? slug : "" }}>
      {({ loading, error, data }) => {
        if (loading) return <h1>LOADING</h1>;
        if (error) return `Error!: ${error}`;
        const { post } = data;
        if (slug && !post) return <Redirect to="/not-found" />;
        return <PostForm post={post} />;
      }}
    </Query>
  );
};

PostEditor.propTypes = {
  slug: PropTypes.string
};

export default PostEditor;
