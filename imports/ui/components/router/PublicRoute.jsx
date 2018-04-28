import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

const PublicRoute = ({ component, exact, path }) => {
  if (Meteor.userId()) return <Redirect to="/" />;
  return (
    <Route
      exact={exact}
      path={path}
      render={props => <main>{React.createElement(component)}</main>}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default PublicRoute;
