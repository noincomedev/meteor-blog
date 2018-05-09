import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { PropTypes } from "prop-types";
import { Query } from "react-apollo";

import PostEditor from "../post/PostEditor";
import PostForm from "../post/PostForm";
import PostItem from "../post/PostItem";

class PrivateList extends Component {
  state = {
    showButton: false,
    showForm: true
  };

  toggleButton = () => {
    this.setState({
      showButton: !this.state.showButton,
      showForm: !this.state.showForm
    });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  toggleCancel = () => {
    this.setState({
      showButton: !this.state.showButton,
      showForm: !this.state.showForm
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      showButton: nextProps.posts.length > 0 ? true : false,
      showForm: nextProps.posts.length > 0 ? false : true
    };
  }

  render() {
    const { error, loading } = this.props;
    const { showButton, showForm } = this.state;
    if (loading) return <h1>LOADING</h1>;
    if (error) return `Error!: ${error}`;
    return (
      <Fragment>
        <h1>PrivateList</h1>
        {showButton && (
          <button type="button" onClick={this.toggleButton}>
            New Post
          </button>
        )}
        {showForm && <PostForm handleCancel={this.toggleCancel} />}
        {this.props.posts.map(post => <PostItem key={post._id} post={post} />)}
      </Fragment>
    );
  }
}

PrivateList.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
};

export default PrivateList;
