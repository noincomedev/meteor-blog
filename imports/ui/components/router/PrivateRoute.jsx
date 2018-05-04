import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";

import { CURRENT_USER } from "./Router";

const PrivateRoute = ({ client, component, exact, path }) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={props => <main>{React.createElement(component)}</main>}
    />
  );
};

PrivateRoute.propTypes = {
  client: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default withApollo(PrivateRoute);
