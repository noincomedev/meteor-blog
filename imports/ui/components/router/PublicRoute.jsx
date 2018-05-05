import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";

import { CURRENT_USER } from "./Router";

const PublicRoute = ({ client, component, exact, path }) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (!user) {
    return (
      <Route
        exact={exact}
        path={path}
        render={props => (
          <main
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {React.createElement(component)}
          </main>
        )}
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
