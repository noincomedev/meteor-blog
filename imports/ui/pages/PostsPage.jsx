import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import PostsPageLayout from "../layouts/PostsPageLayout";

let user = {
  admin: true
};

const PostsPage = ({ match }) => {
  return <PostsPageLayout user={user} slug={match.params.slug} />;
};

export default withRouter(props => <PostsPage {...props} />);
