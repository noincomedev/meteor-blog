import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

const PrivateRoute = ({ component, exact, path }) => {
  if (!Meteor.userId()) return <Redirect to="/" />;
  return (
    <Route
      exact={exact}
      path={path}
      render={props => <main>{React.createElement(component)}</main>}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default PrivateRoute;
