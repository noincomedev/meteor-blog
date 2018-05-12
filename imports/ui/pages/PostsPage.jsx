import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import PostsPageLayout from "../layouts/pages/PostsPageLayout";

const PostsPage = ({ match }) => {
  return <PostsPageLayout slug={match.params.slug} />;
};

export default withRouter(PostsPage);
