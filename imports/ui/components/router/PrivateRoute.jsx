import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
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

const PrivateRoute = ({
  classes,
  client,
  component,
  content,
  exact,
  name,
  path,
  title
}) => {
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
          <Helmet>
            <title>{title}</title>
            <meta name={name} content={content} />
          </Helmet>
          <AppbarLayout private title={title} />
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
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(
  withApollo(PrivateRoute)
);
