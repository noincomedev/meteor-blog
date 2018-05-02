import React from "react";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import { currentUser } from "./Router";

const MultiRoute = ({ client, component, exact, path }) => {
  const { user } = client.readQuery({ query: currentUser });
  if (!user)
    return <PublicRoute exact={exact} path={path} component={component} />;

  return <PrivateRoute exact={exact} path={path} component={component} />;
};

MultiRoute.propTypes = {
  client: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default withApollo(MultiRoute);
