import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import { GET_POST } from "./PostEditor";

class Post extends Component {
  render() {
    const { slug } = this.props;
    return (
      <Query query={GET_POST} variables={{ slug }}>
        {({ loading, error, data }) => {
          if (loading) return <h1>LOADING</h1>;
          if (error) return `Error!: ${error}`;
          const { post } = data;
          if (!post) return <Redirect to="/not-found" />;
          return (
            <div>
              <h1>Title: {post.title}</h1>
              <h3>SLUG: {post.slug}</h3>
              <p>Content:</p>
              <h4>{post.content}</h4>
              <p>TAGS:</p>
              <h6>{post.tags.map(tag => tag)}</h6>
            </div>
          );
        }}
      </Query>
    );
  }
}

Post.propTypes = {
  slug: PropTypes.string
};

export default Post;
