import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import ReactInstagramFeed from "react-instagram-feed";
import { Timeline } from "react-twitter-widgets";

import MainSidenav from "../components/navigation/sidenav/MainSidenav";
import PostListLayout from "../layouts/components/list/PostListLayout";

const styles = theme => ({
  container: {
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.spacing.unit * 2
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }
  },
  mainSection: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
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
      <Grid item xs={12} sm={3}>
        <MainSidenav />
      </Grid>
      <Grid container justify="space-around">
        <Grid item xs={12} sm={4}>
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
                .css({ height: "100%", "min-height": "75vh" });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
