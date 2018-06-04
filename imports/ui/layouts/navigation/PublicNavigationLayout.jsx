import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import Header from "../../../ui/components/navigation/Header";
import ToolbarLayout from "./ToolbarLayout";

const PublicNavigationLayout = ({ location, history, title }) => (
  <nav>
    {location.pathname != "/" ? <ToolbarLayout title={title} /> : <Header />}
  </nav>
);

PublicNavigationLayout.propTypes = {
  title: PropTypes.string
};

export default withRouter(PublicNavigationLayout);
