import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";

import { CURRENT_USER } from "./Router";
import AppbarLayout from "../../layouts/navigation/AppbarLayout";

const styles = theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    background: theme.palette.primary.light,
    height: "100vh",
    marginTop: 64
  }
});

const PrivateRoute = ({ classes, client, component, exact, name, path }) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={props => (
        <Fragment>
          <AppbarLayout private name={name} />
          <main className={classes.main}>{React.createElement(component)}</main>
        </Fragment>
      )}
    />
  );
};

PrivateRoute.propTypes = {
  client: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  name: PropTypes.string,
  path: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withApollo(PrivateRoute)
);
