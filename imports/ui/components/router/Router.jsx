import React from "react";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { graphql } from "react-apollo";

import MultiRoute from "./MultiRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import DashboardPage from "../../pages/DashboardPage";
import LandingPage from "../../pages/LandingPage";
import NotFoundPage from "../../pages/NotFoundPage";
import PostsPage from "../../pages/PostsPage";
import SigninPage from "../../pages/SigninPage";
import SignupPage from "../../pages/SignupPage";

const Router = ({ loading, user }) => {
  if (!loading) {
    return (
      <BrowserRouter>
        <Switch>
          {user ? (
            <PrivateRoute exact path="/" component={DashboardPage} />
          ) : (
            <PublicRoute exact path="/" component={LandingPage} />
          )}
          <MultiRoute exact path="/posts/:slug" component={PostsPage} />
          <MultiRoute exact path="/posts" component={PostsPage} />
          <PublicRoute exact path="/signin" component={SigninPage} />
          <PublicRoute exact path="/signup" component={SignupPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
  return <h1>LOADING</h1>;
};

export const CURRENT_USER = gql`
  query currentUser {
    user {
      _id
      admin
    }
  }
`;

export default graphql(CURRENT_USER, {
  props: ({ data }) => ({ ...data })
})(Router);
