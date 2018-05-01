import React from "react";
import { PropTypes } from "prop-types";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const MultiRoute = ({ component, exact, path }) => {
  if (Meteor.userId())
    return <PrivateRoute exact={exact} path={path} component={component} />;
  else return <PublicRoute exact={exact} path={path} component={component} />;
};

MultiRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default MultiRoute;
