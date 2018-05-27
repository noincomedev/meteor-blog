import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import Header from "../../../ui/components/navigation/Header";
import AppbarLAyout from "./AppbarLayout";

const PublicNavigationLayout = ({ location, history, title }) => (
  <nav>
    {location.pathname != "/" ? <AppbarLAyout title={title} /> : <Header />}
  </nav>
);

PublicNavigationLayout.propTypes = {
  title: PropTypes.string
};

export default withRouter(PublicNavigationLayout);
