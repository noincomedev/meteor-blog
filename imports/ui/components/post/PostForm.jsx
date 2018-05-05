import React, { Component } from "react";
import { PropTypes } from "prop-types";

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

    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    const { post } = this.props;
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
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={this.handleChange}
        />
        <input type="text" name="slug" placeholder="SLUG" disabled />
        <input
          type="text"
          name="content"
          placeholder="Content"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="TAGs"
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          {post ? "Edit" : "Add"} Post
        </button>
      </form>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.object
};

export default PostForm;
