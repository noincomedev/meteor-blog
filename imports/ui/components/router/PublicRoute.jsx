import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";

import { currentUser } from "./Router";

const PublicRoute = ({ client, component, exact, path }) => {
  const { user } = client.readQuery({ query: currentUser });
  if (!user) {
    return (
      <Route
        exact={exact}
        path={path}
        render={props => <main>{React.createElement(component)}</main>}
      />
    );
  }
  return <Redirect to="/" />;
};

PublicRoute.propTypes = {
  client: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default withApollo(PublicRoute);
