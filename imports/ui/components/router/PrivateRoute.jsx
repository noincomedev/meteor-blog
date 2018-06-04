import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";

import { CURRENT_USER } from "./Router";

import NavigationLayout from "../../layouts/navigation/NavigationLayout";

const styles = theme => ({
  main: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: theme.palette.background.default,
    padding: 24,
    marginTop: 56,
    [theme.breakpoints.up("md")]: {
      marginTop: 64,
      marginLeft: 240
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 64,
      marginLeft: 60
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 64,
      marginLeft: 0
    }
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
            <title>{`NOINCOMEDEV | ${title}`}</title>
            <meta name={name} content={content} />
          </Helmet>
          <NavigationLayout title={title} />
          <main className={classes.main}>{React.createElement(component)}</main>
        </Fragment>
      )}
    />
  );
};

PrivateRoute.propTypes = {
  client: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  name: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(
  withApollo(PrivateRoute)
);
