import React from "react";

import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import PrivateToolbar from "../../components/navigation/PrivateToolbar";
import PublicToolbar from "../../components/navigation/PublicToolbar";

const styles = theme => ({});

const AppbarLayout = ({ classes, name, private }) => (
  <AppBar position="fixed" color="primary">
    {private ? <PrivateToolbar name={name} /> : <PublicToolbar name={name} />}
  </AppBar>
);

AppbarLayout.propTypes = {
  name: PropTypes.string,
  private: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(AppbarLayout);
