import React, { Component } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { Bert } from "meteor/themeteorchef:bert";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import { USER_POSTS } from "../../layouts/components/list/PostListLayout";

const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $slug: String!
    $content: String!
    $tags: [String]!
  ) {
    createPost(title: $title, slug: $slug, content: $content, tags: $tags) {
      _id
    }
  }
`;

const EDIT_POST = gql`
  mutation editPost(
    $_id: String!
    $title: String!
    $slug: String!
    $content: String!
    $tags: [String]!
  ) {
    editPost(
      _id: $_id
      title: $title
      slug: $slug
      content: $content
      tags: $tags
    ) {
      _id
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($_id: String!) {
    deletePost(_id: $_id) {
      _id
    }
  }
`;

class PostForm extends Component {
  state = {
    title: "",
    slug: "",
    content: "",
    tags: []
  };

  handleChange = event => {
    const name = event.target.name,
      value = event.target.value;
    if (name == "title") this.updateSlug(value);
    switch (name) {
      case "title":
        this.setState({ title: value });
        this.updateSlug(value);
        break;
      case "tags":
        this.setState({ tags: value.split(",").map(tag => tag.trim()) });
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  };

  handleSubmit = () => {
    const { _id, title, slug, content, tags } = this.state;
    const variables = { _id, title, slug, content, tags };
    if (_id) {
      this.props
        .editPost({ variables })
        .then(
          Bert.alert({
            title: "Success",
            message: "Post saved",
            type: "success",
            style: "growl-top-right",
            icon: "fa-check"
          })
        )
        .catch(error => console.log(error));
    } else {
      this.props
        .createPost({ variables: { title, slug, content, tags } })
        .then(
          Bert.alert({
            title: "Success",
            message: "Post added.",
            type: "success",
            style: "growl-top-right",
            icon: "fa-check"
          })
        )
        .catch(error =>
          Bert.alert({
            title: error ? "Error!" : "Success",
            message: error ? error.message : "Post saved",
            type: error ? "danger" : "success",
            style: "growl-top-right",
            icon: error ? "fa-remove" : "fa-check"
          })
        );
    }
  };

  handleCancel = () => {
    this.props.handleCancel();
  };

  handleDelete = () => {
    const { _id } = this.state;
    const { history } = this.props;
    const variables = { _id };
    if (_id) {
      this.props
        .deletePost({ variables })
        .then(
          Bert.alert({
            title: "Success",
            message: "Post deleted.",
            type: "danger",
            style: "growl-top-right",
            icon: "fa-remove"
          })
        )
        .then(history.push("/posts"))
        .catch(error =>
          Bert.alert({
            title: error ? "Error!" : "Success",
            message: error ? error.message : "Post saved",
            type: error ? "danger" : "success",
            style: "growl-top-right",
            icon: error ? "fa-remove" : "fa-check"
          })
        );
    }
  };

  updateSlug = title => {
    this.setState({ slug: getSlug(title) });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...nextProps.post
    };
  }

  render() {
    const { post } = this.props;
    const { title, slug, content, tags } = this.state;

    return (
      <form
        onSubmit={event => event.preventDefault()}
        style={{
          minWidth: 500,
          display: "flex",
          flexDirection: "column",
          margin: 16
        }}
      >
        {post && <h1>Edit Post</h1>}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="slug"
          placeholder="SLUG"
          disabled
          onChange={this.updateSlug}
          value={slug}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          onChange={this.handleChange}
          value={content}
        />
        <input
          type="text"
          name="tags"
          placeholder="TAGs (comma separated)"
          onChange={this.handleChange}
          value={tags}
        />
        <button onClick={this.handleSubmit}>
          {post ? "Save" : "Add"} Post
        </button>
        {post && (
          <button
            type="button"
            style={{ background: "red", color: "white" }}
            onClick={this.handleDelete}
          >
            Delete Post
          </button>
        )}
        <button type="button" onClick={this.handleCancel}>
          Cancel
        </button>
      </form>
    );
  }
}

PostForm.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  post: PropTypes.object
};

export default compose(
  graphql(EDIT_POST, {
    name: "editPost"
  }),
  graphql(DELETE_POST, {
    name: "deletePost",
    options: {
      refetchQueries: ["posts"],
      variables: { owner: Meteor.userId() }
    }
  }),
  graphql(CREATE_POST, {
    name: "createPost",
    options: {
      refetchQueries: ["posts"],
      variables: { owner: Meteor.userId() }
    }
  })
)(withRouter(PostForm));
