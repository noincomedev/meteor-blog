import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";
import { Redirect, withRouter } from "react-router-dom";

import Spinner from "../utils/Spinner";
import CardWithTitleAndContent from "../../layouts/components/card/CardWithTitleAndContent";

import PostForm from "./PostForm";

export const GET_POST = gql`
  query Post($slug: String!) {
    post(slug: $slug) {
      _id
      title
      category
      content
      published
      tags
      slug
      intro
      new
      imageUrl
    }
  }
`;

class PostEditor extends Component {
  handleCancel = () => {
    const { history, slug } = this.props;
    return slug ? history.push("/posts") : this.props.onCancel();
  };
  render() {
    const { slug } = this.props;
    return (
      <Query query={GET_POST} variables={{ slug: slug ? slug : "" }}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return `Error!: ${error}`;
          const { post } = data;
          if (slug && !post) return <Redirect to="/not-found" />;
          return (
            <CardWithTitleAndContent title="Edit Post">
              <PostForm handleCancel={this.handleCancel} post={post} />
            </CardWithTitleAndContent>
          );
        }}
      </Query>
    );
  }
}

PostEditor.propTypes = {
  onCancel: PropTypes.func,
  slug: PropTypes.string
};

export default withRouter(props => <PostEditor {...props} />);
