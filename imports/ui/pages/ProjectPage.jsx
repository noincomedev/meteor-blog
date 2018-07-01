import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";

import { CURRENT_USER } from "../components/router/Router";

import PrivateProjectPageLayout from "../layouts/pages/project/Private";
import PublicProjectPageLayout from "../layouts/pages/project/Public";

const ProjectPage = ({ client, match, project }) => {
  const { params } = match;
  const { _id } = params;
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (user) {
    return <PrivateProjectPageLayout id={_id} />;
  } else {
    return <PublicProjectPageLayout id={_id} />;
  }
};

export default withApollo(withRouter(ProjectPage));
