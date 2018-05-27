import React from "react";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { graphql } from "react-apollo";

import theme from "../../../assets/theme";

import MultiRoute from "./MultiRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Spinner from "../utils/Spinner";

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
        <MuiThemeProvider theme={theme}>
          <Switch>
            {user ? (
              <PrivateRoute
                name="Dahboard Page"
                content="Dashboard Page"
                exact
                path="/"
                title="Dashboard"
                component={DashboardPage}
              />
            ) : (
              <PublicRoute
                title="Index"
                content="Index Page"
                exact
                path="/"
                name="Index Page"
                component={LandingPage}
              />
            )}
            <MultiRoute exact path="/posts/:slug" component={PostsPage} />
            <MultiRoute
              content="Posts Page"
              exact
              name="Posts Page"
              path="/posts"
              title="Posts"
              component={PostsPage}
            />
            <PublicRoute
              title="Sign In"
              content="Sing In Page"
              exact
              name="Sing In Page"
              path="/signin"
              component={SigninPage}
            />
            <PublicRoute
              title="Sing UP"
              content="Sing Up Page"
              exact
              name="Sign Up Page"
              path="/signup"
              component={SignupPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
  return <Spinner />;
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
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: ({ data }) => ({ ...data })
})(Router);
