import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import Header from "../../../ui/components/navigation/Header";
import AppbarLAyout from "./AppbarLayout";

const PublicNavigationLayout = ({ location, history, name }) => (
  <nav>
    {location.pathname != "/" ? <AppbarLAyout name={name} /> : <Header />}
  </nav>
);

PublicNavigationLayout.propTypes = {
  name: PropTypes.string
};

export default withRouter(PublicNavigationLayout);
