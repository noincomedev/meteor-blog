import React from "react";

import List from "../components/list/List";
import Post from "../components/post/Post";
import PostEditor from "../components/post/PostEditor";

export default (PostsPageLayout = ({ user, slug }) => {
  const { admin } = user;
  if (admin && slug) return <PostEditor slug={slug} />;
  else if (slug) return <Post slug={slug} />;
  return <List admin={admin} />;
});
