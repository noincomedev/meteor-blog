import React from "react";
import { withApollo } from "react-apollo";

import List from "../components/list/List";
import Post from "../components/post/Post";
import PostEditor from "../components/post/PostEditor";

import { currentUser } from "../components/router/Router";

const PostsPageLayout = ({ client, slug }) => {
  const { user } = client.readQuery({ query: currentUser });
  const admin = user ? user.admin : false;
  if (admin && slug) return <PostEditor slug={slug} />;
  else if (slug) return <Post slug={slug} />;
  return <List admin={admin} />;
};

export default withApollo(PostsPageLayout);
