import React from "react";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";

import PublicWipPageLayout from "../layouts/pages/PublicWipPageLayout";
import PrivateWipPageLayout from "../layouts/pages/PrivateWipPageLayout";

import { CURRENT_USER } from "../components/router/Router";

const WipPage = ({ client }) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (user) return <PrivateWipPageLayout />;
  return <PublicWipPageLayout />;
};

WipPage.propTypes = {
  client: PropTypes.object.isRequired
};

export default withApollo(WipPage);
