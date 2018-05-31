import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import PostListLayout from "../layouts/components/list/PostListLayout";
import ProfileBanner from "../components/profile/ProfileBanner";

export default (LandingPage = () => (
  <div>
    <PostListLayout />
  </div>
));
