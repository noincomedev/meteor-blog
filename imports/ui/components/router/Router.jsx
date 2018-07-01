import React from "react";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { graphql } from "react-apollo";

import theme from "../../../assets/theme";

import MultiRoute from "./MultiRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import ScrollTop from "../utils/ScrollTop";
import Spinner from "../utils/Spinner";

import AboutPage from "../../pages/AboutPage";
import DashboardPage from "../../pages/DashboardPage";
import LandingPage from "../../pages/LandingPage";
import NotFoundPage from "../../pages/NotFoundPage";
import PostsPage from "../../pages/PostsPage";
import ProjectPage from "../../pages/ProjectPage";
import SigninPage from "../../pages/SigninPage";
import SignupPage from "../../pages/SignupPage";
import StackPage from "../../pages/StackPage";
import WipPage from "../../pages/WipPage";

const Router = ({ loading, user }) => {
  if (!loading) {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <ScrollTop>
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
                  title="Home"
                  content="Index Page"
                  exact
                  path="/"
                  name="Index Page"
                  component={LandingPage}
                />
              )}
              <MultiRoute exact path="/posts/:slug" component={PostsPage} />
              <MultiRoute
                content="Wip Page"
                exact
                name="Wip Page"
                title="WIP"
                path="/wip"
                component={WipPage}
              />
              <MultiRoute
                content="Posts Page"
                exact
                name="Posts Page"
                path="/posts"
                title="Posts"
                component={PostsPage}
              />
              <MultiRoute
                name="Project Page"
                content="Project Page"
                exact
                path="/projects/:_id"
                title="Project"
                component={ProjectPage}
              />
              <PublicRoute
                title="About Me"
                content="Description about me"
                exact
                name="About Me"
                path="/about"
                component={AboutPage}
              />
              <PublicRoute
                title="Sign IN"
                content="Sing In Page"
                exact
                name="Sing In"
                path="/signin"
                component={SigninPage}
              />
              <PublicRoute
                title="Sing UP"
                content="Sing Up Page"
                exact
                name="Sign Up"
                path="/signup"
                component={SignupPage}
              />
              <PublicRoute
                title="STACK"
                content="Stack"
                exact
                name="Stack Page"
                path="/stack"
                component={StackPage}
              />
              <MultiRoute
                title="404 Not Found"
                content="404"
                name="404 Page"
                component={NotFoundPage}
              />
            </Switch>
          </ScrollTop>
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
