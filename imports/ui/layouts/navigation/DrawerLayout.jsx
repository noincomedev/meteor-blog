import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";

import { CURRENT_USER } from "../../components/router/Router";

import PrivateDrawer from "../../components/navigation/drawer/Private";

const DrawerLayout = ({ client, onToggleDrawer, open }) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (user) return <PrivateDrawer open={open} toggleDrawer={onToggleDrawer} />;
  return null;
};

DrawerLayout.propTypes = {
  onToggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default withApollo(DrawerLayout);
