import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";

import { CURRENT_USER } from "../../components/router/Router";

import PrivateToolbar from "../../components/navigation/toolbar/Private";
import PublicToolbar from "../../components/navigation/toolbar/Public";

const styles = theme => ({});

const ToolbarLayout = ({ client, open, onToggleDrawer, title }) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (user) {
    return <PrivateToolbar open={open} onToggleDrawer={onToggleDrawer} />;
  }
  return <PublicToolbar title={title} />;
};

ToolbarLayout.propTypes = {
  onToggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(
  withApollo(ToolbarLayout)
);
