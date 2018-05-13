import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import Header from "../../../ui/components/navigation/Header";
import NavBar from "../../../ui/components/navigation/NavBar";

const PublicNavigationLayout = ({ location, history, name }) => (
  <nav>{location.pathname != "/" ? <NavBar name={name} /> : <Header />}</nav>
);

PublicNavigationLayout.propTypes = {
  name: PropTypes.string
};

export default withRouter(PublicNavigationLayout);
