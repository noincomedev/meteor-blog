import React, { Component } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { Bert } from "meteor/themeteorchef:bert";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToMarkdown } from "draft-js-export-markdown";
import { stateFromMarkdown } from "draft-js-import-markdown";

const styles = theme => ({
  container: {
    display: "flex",
    overflow: "auto"
  },
  editor: {
    border: `1px solid ${theme.palette.grey[200]}`,
    minHeight: 150
  }
});

class PostForm extends Component {
  constructor(props) {
    super(props);
    const { post } = props;
    this.state = {
      _id: post ? post._id : null,
      title: post ? post.title : "",
      imageUrl: post ? post.imageUrl : "",
      slug: post ? post.slug : "",
      category: post ? post.category : "",
      content: post ? post.content : "",
      tags: post ? post.tags : [],
      editorState: post
        ? EditorState.createWithContent(stateFromMarkdown(post.content))
        : EditorState.createEmpty()
    };
  }

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;
    if (name == "title") this.updateSlug(value);
    switch (name) {
      case "category":
        this.setState({ category: value });
        break;
      case "tags":
        this.setState({ tags: value.split(",").map(tag => tag.trim()) });
        break;
      case "title":
        this.setState({ title: value });
        this.updateSlug(value);
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  };

  handleSubmit = () => {
    const { history } = this.props;
    const { _id, title, imageUrl, slug, category, content, tags } = this.state;
    const variables = {
      _id,
      title,
      imageUrl,
      slug,
      category,
      content,
      tags
    };
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
    } else {
      this.props
        .createPost({
          variables: { title, imageUrl, slug, category, content, tags }
        })
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

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
      content: stateToMarkdown(editorState.getCurrentContent())
    });
  };

  render() {
    const { classes, post } = this.props;
    const { title, imageUrl, slug, category, tags, editorState } = this.state;
    return (
      <form
        className={classes.container}
        onSubmit={event => event.preventDefault()}
      >
        <Grid container justify="center">
          <Grid item xs={12}>
            <TextField
              id="title"
              label="Title"
              className={classes.textField}
              value={title}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="slug"
              label="Slug"
              className={classes.textField}
              value={slug}
              onChange={this.handleChange}
              margin="normal"
              disabled
              fullWidth
            />
            <TextField
              id="imageUrl"
              label="Image URL"
              className={classes.textField}
              value={imageUrl ? imageUrl : ""}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="category"
              label="Category"
              className={classes.textField}
              value={category}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="tags"
              label="Tags"
              className={classes.textField}
              value={tags}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              helperText="No spaces, use - instead. Separate by comma."
            />
            <Editor
              editorClassName={classes.editor}
              defaultEditorState={editorState}
              onEditorStateChange={this.onEditorStateChange}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "list",
                  "link",
                  "embedded",
                  "emoji",
                  "image",
                  "history"
                ],
                inline: {
                  inDropdown: true,
                  options: ["bold", "italic"]
                },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                  previewImage: true,
                  alt: { present: true, mandatory: true }
                }
              }}
            />
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Button
                variant="raised"
                color="primary"
                fullWidth
                onClick={this.handleSubmit}
              >
                {post ? "Save" : "Add"}
              </Button>
              {post && (
                <Button
                  type="button"
                  variant="raised"
                  color="secondary"
                  fullWidth
                  onClick={this.handleDelete}
                >
                  Delete
                </Button>
              )}
              <Button
                type="button"
                variant="raised"
                color="inherit"
                fullWidth
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

PostForm.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  post: PropTypes.object
};

const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $slug: String!
    $content: String!
    $tags: [String]!
    $category: String!
    $imageUrl: String!
  ) {
    createPost(
      title: $title
      slug: $slug
      category: $category
      content: $content
      tags: $tags
      imageUrl: $imageUrl
    ) {
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
    $category: String!
    $imageUrl: String!
  ) {
    editPost(
      _id: $_id
      title: $title
      slug: $slug
      content: $content
      tags: $tags
      category: $category
      imageUrl: $imageUrl
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

export default compose(
  graphql(EDIT_POST, {
    name: "editPost",
    options: {
      refetchQueries: ["posts"],
      variables: { owner: Meteor.userId() }
    }
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
)(withRouter(withStyles(styles)(PostForm)));
