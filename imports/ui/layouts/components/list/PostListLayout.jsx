import React from "react";
import { PropTypes } from "prop-types";

import PrivateList from "../../../components/list/PrivateList";
import PublicList from "../../../components/list/PublicList";

const PostListLayout = ({ user }) =>
  user ? <PrivateList user={user} /> : <PublicList />;

PostListLayout.propTypes = {
  user: PropTypes.object
};

export default PostListLayout;
