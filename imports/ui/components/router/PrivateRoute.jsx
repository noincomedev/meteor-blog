import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";
import { withStyles } from "material-ui/styles";

import { CURRENT_USER } from "./Router";

const styles = theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    background: theme.palette.primary.light,
    height: "100vh"
  }
});

const PrivateRoute = ({ classes, client, component, exact, path }) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={props => (
        <main className={classes.main}>{React.createElement(component)}</main>
      )}
    />
  );
};

PrivateRoute.propTypes = {
  client: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withApollo(PrivateRoute)
);
