import React from "react";
import { Link } from "react-router-dom";

export default (PostItem = ({ post }) => {
  return (
    <div>
      <Link to={`/posts/${post.slug}`}>
        <h1>{post.title}</h1>
      </Link>
    </div>
  );
});
