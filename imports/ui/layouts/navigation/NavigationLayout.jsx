import React, { Component } from "react";
import classNames from "classnames";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

import DrawerLayout from "./DrawerLayout";
import ToolbarLayout from "./ToolbarLayout";
import PublicHeader from "../../components/navigation/header/Public";

import { CURRENT_USER } from "../../components/router/Router";

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

class NavigationLayout extends Component {
  state = {
    open: false
  };

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, client, location, match } = this.props;
    let { open } = this.state;
    const { user } = client.readQuery({ query: CURRENT_USER });
    return (
      <nav>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, open && classes.appBarShift)}
        >
          <ToolbarLayout onToggleDrawer={this.toggleDrawer} open={open} />
        </AppBar>
        <DrawerLayout open={open} onToggleDrawer={this.toggleDrawer} />
        {!user && location.pathname == "/" && match.isExact && <PublicHeader />}
      </nav>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withApollo(withRouter(NavigationLayout))
);
