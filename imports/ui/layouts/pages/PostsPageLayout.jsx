import React from "react";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";

import PostListLayout from "../components/list/PostListLayout";
import Post from "../../components/post/Post";
import PostEditor from "../../components/post/PostEditor";

import { CURRENT_USER } from "../../components/router/Router";

const PostsPageLayout = ({ client, slug }) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  const { admin } = user;
  if (admin && slug) return <PostEditor slug={slug} />;
  else if (slug) return <Post slug={slug} />;
  return <PostListLayout user={user} />;
};

PostsPageLayout.propTypes = {
  client: PropTypes.object.isRequired,
  slug: PropTypes.string
};

export default withApollo(PostsPageLayout);
