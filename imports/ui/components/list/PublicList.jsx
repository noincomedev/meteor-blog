import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

export default (PublicList = ({ posts }) => (
  <div>
    <h1>Public Posts</h1>
    {posts.map(post => (
      <Link to={`/posts/${post.slug}`} key={post._id}>
        <h1>{post.title}</h1>
      </Link>
    ))}
  </div>
));
