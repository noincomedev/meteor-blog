import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { Helmet } from "react-helmet";
import { Bert } from "meteor/themeteorchef:bert";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

import ValidatedForm from "../utils/ValidatedForm";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToMarkdown } from "draft-js-export-markdown";
import { stateFromMarkdown } from "draft-js-import-markdown";

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  editor: {
    border: `1px solid ${theme.palette.grey[200]}`,
    minHeight: 150
  },
  headerContent: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between"
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
        : EditorState.createEmpty(),
      private: post ? post.private : false
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
      case "private":
        this.props.togglePostPrivacy({
          variables: {
            _id: this.props.post._id,
            private: event.target.checked
          }
        });
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
        .then(this.props.handleCancel())
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
        .then(this.props.handleCancel())
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
        .then(this.props.handleCancel())
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
    const { classes, post, showCancelButton } = this.props;
    const { title, imageUrl, slug, category, tags, editorState } = this.state;
    return (
      <Grid
        container
        classes={{ container: classes.container }}
        justify="center"
      >
        <Helmet>
          <title>NOINCOMEDEV | Edit Post</title>
          <meta name="Edit Post" content="Edit Post" />
        </Helmet>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`${post ? "Edit" : "New"} Post`}
              classes={{ content: classes.headerContent }}
              subheader={
                post && (
                  <FormControlLabel
                    control={
                      <Switch
                        id="private"
                        onChange={this.handleChange}
                        checked={post.private}
                        value="private"
                      />
                    }
                    label="Private"
                  />
                )
              }
            />
            <Divider />
            <CardContent>
              <ValidatedForm onHandleSubmit={this.handleSubmit}>
                <TextField
                  id="title"
                  label="Title"
                  className={classes.textField}
                  value={title}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                  required
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
                  required
                />
                <TextField
                  id="imageUrl"
                  label="Image URL"
                  className={classes.textField}
                  value={imageUrl ? imageUrl : ""}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                  required
                />
                <TextField
                  id="category"
                  label="Category"
                  className={classes.textField}
                  value={category}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                  required
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
                  required
                />
                <Editor
                  id="editor"
                  spellCheck={false}
                  editorClassName={classes.editor}
                  editorState={editorState}
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
                    inline: { inDropdown: true, options: ["bold", "italic"] },
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
                <Grid
                  container
                  spacing={8}
                  justify="flex-end"
                  style={{ marginTop: 8 }}
                >
                  {showCancelButton && (
                    <Grid item xs={4}>
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
                  )}
                  {post && (
                    <Grid item xs={4}>
                      <Button
                        type="button"
                        variant="raised"
                        color="secondary"
                        fullWidth
                        onClick={this.handleDelete}
                      >
                        Delete
                      </Button>
                    </Grid>
                  )}
                  <Grid item xs={4}>
                    <Button
                      variant="raised"
                      color="primary"
                      fullWidth
                      onClick={this.handleSubmit}
                    >
                      {post ? "Save" : "Add"}
                    </Button>
                  </Grid>
                </Grid>
              </ValidatedForm>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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

const TOGGLE_POST_PRIVACY = gql`
  mutation togglePostPrivacy($_id: String!, $private: Boolean!) {
    togglePostPrivacy(_id: $_id, private: $private) {
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
  }),
  graphql(TOGGLE_POST_PRIVACY, {
    name: "togglePostPrivacy",
    options: {
      refetchQueries: ["posts"],
      variables: { owner: Meteor.userId() }
    }
  })
)(withRouter(withStyles(styles)(PostForm)));
