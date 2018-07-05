import React, { Fragment } from "react";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import NavigationLayout from "../../layouts/navigation/NavigationLayout";
import PublicFooterLayout from "../../layouts/navigation/PublicFooterLayout";

const styles = theme => ({
  landingPageMain: {
    flex: 1,
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      marginTop: 0
    },
    paddingTop: theme.spacing.unit
  },
  main: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      marginTop: 64
    }
  }
});

const PublicRoute = ({
  content,
  classes,
  component,
  exact,
  location,
  name,
  path,
  title
}) => {
  if (!Meteor.userId()) {
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
            <NavigationLayout location={location} />
            <main
              className={classNames(
                location.pathname != "/"
                  ? classes.main
                  : classes.landingPageMain
              )}
            >
              {React.createElement(component, { name })}
            </main>
            <PublicFooterLayout />
          </Fragment>
        )}
      />
    );
  }
  return <Redirect to="/" />;
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  name: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(withRouter(PublicRoute));
