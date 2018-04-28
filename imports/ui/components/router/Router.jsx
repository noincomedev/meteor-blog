import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import DashboardPage from "../../pages/DashboardPage";
import LandingPage from "../../pages/LandingPage";
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
      <PublicRoute exact path="/signin" component={SigninPage} />
      <PublicRoute exact path="/signup" component={SignupPage} />
    </Switch>
  </BrowserRouter>
));
