import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MultiRoute from "./MultiRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import DashboardPage from "../../pages/DashboardPage";
import LandingPage from "../../pages/LandingPage";
import NotFoundPage from "../../pages/NotFoundPage";
import PostsPage from "../../pages/PostsPage";
import SigninPage from "../../pages/SigninPage";
import SignupPage from "../../pages/SignupPage";

export default (Router = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={props => {
          return Meteor.userId() ? (
            <PrivateRoute exact path="/" component={DashboardPage} />
          ) : (
            <PublicRoute exact path="/" component={LandingPage} />
          );
        }}
      />
      <MultiRoute exact path="/posts/:slug" component={PostsPage} />
      <MultiRoute exact path="/posts" component={PostsPage} />
      <PublicRoute exact path="/signin" component={SigninPage} />
      <PublicRoute exact path="/signup" component={SignupPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
));
