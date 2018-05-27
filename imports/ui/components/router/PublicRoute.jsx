import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import PublicNavigationLayout from "../../layouts/navigation/PublicNavigationLayout";

import { CURRENT_USER } from "./Router";

const styles = theme => ({
  main: {
    display: "flex",
    justifyContent: "center",
    padding: `${theme.spacing.unit * 8 + 24}px 24px 24px 24px`
  },
  landingPageMain: {
    display: "flex",
    justifyContent: "center",
    padding: `0px 24px 24px 24px`
  }
});

const PublicRoute = ({
  content,
  classes,
  client,
  component,
  exact,
  location,
  name,
  path,
  title
}) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (!user) {
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
            <PublicNavigationLayout title={title} />
            <main
              className={
                location.pathname == "/"
                  ? classes.landingPageMain
                  : classes.main
              }
            >
              {React.createElement(component, { name })}
            </main>
          </Fragment>
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
  name: PropTypes.string,
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string
};

export default withApollo(
  withStyles(styles, { withTheme: true })(
    withRouter(props => <PublicRoute {...props} />)
  )
);
