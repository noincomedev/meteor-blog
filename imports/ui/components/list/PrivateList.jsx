import React, { Component } from "react";
import { PropTypes } from "prop-types";

class PrivateList extends Component {
  render() {
    return <h1>PrivateList</h1>;
  }
}

PrivateList.propTypes = {
  posts: PropTypes.array,
  loading: PropTypes.bool
};

export default PrivateList;
