import React, { Component } from "react";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import ReactInstagramFeed from "react-instagram-feed";
import { Timeline } from "react-twitter-widgets";

import MainSidenav from "../components/navigation/sidenav/MainSidenav";
import PostListLayout from "../layouts/components/list/PostListLayout";

const styles = theme => ({
  feedsContainer: {
    paddingTop: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    background: "linear-gradient(to right, #94d6d6 0%,#3b295a 80%)",
    [theme.breakpoints.down("sm")]: {
      background: "linear-gradient(to bottom, #94d6d6 0%,#3b295a 80%)"
    }
  },
  feedHeadingContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  instagramIcon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.primary.dark,
    textShadow: `1px 1px 3px ${theme.palette.secondary.light}`
  },
  instagramLogo: {
    color: theme.palette.primary.dark,
    fontFamily: "Oleo Script",
    textShadow: `1px 1px ${theme.palette.secondary.light}`
  },
  mainSection: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  sidenavContainer: {
    paddingRight: theme.spacing.unit * 2
  },
  twitterContainer: { overflow: "auto" },
  twitterIcon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.primary.dark,
    textShadow: `1px 1px 3px ${theme.palette.custom.text}`
  },
  twitterLogo: {
    color: theme.palette.primary.dark,
    fontFamily: "Oleo Script",
    textShadow: `1px 1px ${theme.palette.custom.text}`
  }
});

const LandingPage = ({ classes }) => {
  const InstagramWrapper = ({ children }) => (
    <div className={classes.instagramWrapper}>{children}</div>
  );

  return (
    <Grid
      container
      justify="flex-end"
      classes={{ container: classes.container }}
    >
      <Grid item xs={12} sm={9} classes={{ item: classes.mainSection }}>
        <PostListLayout />
      </Grid>
      <Grid item xs={12} sm={3} classes={{ item: classes.sidenavContainer }}>
        <MainSidenav />
      </Grid>
      <Grid
        container
        justify="space-around"
        classes={{ container: classes.feedsContainer }}
      >
        <Grid item xs={12} md={4} classes={{ item: classes.twitterContainer }}>
          <div className={classes.feedHeadingContainer}>
            <i
              className={classNames(
                "fab fa-twitter fa-3x",
                classes.twitterIcon
              )}
            />
            <Typography
              color="secondary"
              variant="display3"
              classes={{ display3: classes.twitterLogo }}
            >
              Twitter
            </Typography>
          </div>
          <Timeline
            dataSource={{
              sourceType: "profile",
              screenName: "noincomedev"
            }}
            options={{
              username: "Noincomedev",
              height: "100%",
              width: "100%"
            }}
            onLoad={() => {
              $("#twitter-widget-0")
                .parent()
                .css({
                  height: "100%",
                  "min-height": "66vh",
                  "max-height": "100vh"
                });
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.feedHeadingContainer}>
            <i
              className={classNames(
                "fab fa-instagram fa-3x",
                classes.instagramIcon
              )}
            />
            <Typography
              variant="display3"
              classes={{ display3: classes.instagramLogo }}
            >
              Instagram
            </Typography>
          </div>
          <ReactInstagramFeed
            accessToken="7596328311.bb8560a.403c9242eeb9404ab44f41331f2dda76"
            count={1}
            type="user"
            param="self"
            resolution="standard"
            wrapper={InstagramWrapper}
            hasLink
            before={() => {}}
            after={() => {}}
            showButton={false}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(LandingPage);
