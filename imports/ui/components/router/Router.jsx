import React from "react";
import gql from "graphql-tag";
import { MuiThemeProvider } from "material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { graphql } from "react-apollo";

import theme from "../../../assets/theme";

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
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            {user ? (
              <PrivateRoute exact path="/" component={DashboardPage} />
            ) : (
              <PublicRoute exact path="/" component={LandingPage} />
            )}
            <MultiRoute exact path="/posts/:slug" component={PostsPage} />
            <MultiRoute
              exact
              name="Posts"
              path="/posts"
              component={PostsPage}
            />
            <PublicRoute
              exact
              name="Sing In"
              path="/signin"
              component={SigninPage}
            />
            <PublicRoute
              exact
              name="Sign Up"
              path="/signup"
              component={SignupPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
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
