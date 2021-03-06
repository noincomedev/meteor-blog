import React from "react";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import { CURRENT_USER } from "./Router";

const MultiRoute = ({
  client,
  component,
  content,
  exact,
  name,
  path,
  title
}) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (!user)
    return (
      <PublicRoute
        exact={exact}
        name={name}
        path={path}
        component={component}
        title={title}
        content={content}
      />
    );

  return (
    <PrivateRoute
      exact={exact}
      name={name}
      path={path}
      component={component}
      title={title}
      content={content}
    />
  );
};

MultiRoute.propTypes = {
  client: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  name: PropTypes.string,
  path: PropTypes.string
};

export default withApollo(MultiRoute);
