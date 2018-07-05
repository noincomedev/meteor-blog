import React, { Component, Fragment } from "react";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

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
  },
  openDrawer: {
    paddingLeft: 240
  }
});

class PrivateRoute extends Component {
  state = {
    open: false
  };

  onToggleDrawer = open => {
    this.setState({ open });
  };

  render() {
    const {
      classes,
      component,
      content,
      exact,
      name,
      path,
      title
    } = this.props;
    const { open } = this.state;
    if (!Meteor.userId()) return <Redirect to="/" />;
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
            <NavigationLayout
              title={title}
              handleToggleDrawer={this.onToggleDrawer}
            />
            <main
              className={classNames(classes.main, open && classes.openDrawer)}
            >
              {React.createElement(component)}
            </main>
          </Fragment>
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  name: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(PrivateRoute);
