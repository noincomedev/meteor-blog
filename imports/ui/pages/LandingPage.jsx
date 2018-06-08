import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

import PostListLayout from "../layouts/components/list/PostListLayout";

import SubscribeToNewsletter from "../components/utils/SubscribeToNewsletter";

import { Timeline } from "react-twitter-widgets";
import ReactInstagramFeed from "react-instagram-feed";

const styles = theme => ({
  avatar: {
    height: 200,
    width: 200,
    border: `${theme.spacing.unit / 2}px ${theme.palette.primary.main} solid`,
    alignSelf: "center"
  },
  divider: { marginBottom: theme.spacing.unit },
  feedsContainer: {
    marginTop: theme.spacing.unit * 2,
    background: "linear-gradient(to right, #94d6d6 0%,#3b295a 80%)",
    [theme.breakpoints.down("xs")]: {
      background: "linear-gradient(to bottom, #94d6d6 0%,#3b295a 80%)"
    }
  },
  instagramContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  instagramIcon: {
    color: theme.palette.secondary.main,
    textShadow: `1px 1px 3px #212121`
  },
  instagramLogo: {
    color: theme.palette.primary.dark,
    fontFamily: "Oleo Script",
    textShadow: `1px 1px ${theme.palette.secondary.light}`
  },
  instagramWrapper: {},
  item: {
    flex: 1,
    width: "100%"
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  socialList: {
    width: "100%"
  },
  supportSection: {
    width: "100%",
    minHeight: "10vh",
    backgroundColor: theme.palette.grey[300],
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  twitterContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  twitterIcon: {
    color: theme.palette.custom.text,
    textShadow: `1px 1px 3px ${theme.palette.primary.main}`
  },
  twitterLogo: {
    color: theme.palette.primary.main,
    fontFamily: "Oleo Script",
    textShadow: `1px 1px ${theme.palette.common.white}`
  }
});

const LandingPage = ({ classes }) => {
  const InstagramWrapper = ({ children }) => (
    <div className={classes.instagramWrapper}>{children}</div>
  );
  return (
    <div>
      <Grid container alignItems="flex-start" spacing={16}>
        <Grid item xs={12} md={8}>
          <PostListLayout />
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.itemContainer}>
            <Grid item xs={12} classes={{ item: classes.item }}>
              <Typography variant="headline">Recent Activity</Typography>
              <Divider className={classes.divider} />
            </Grid>
            <p>WORKING ON THIS FEATURE</p>
          </div>
          <div className={classes.itemContainer}>
            <Grid item xs={12} classes={{ item: classes.item }}>
              <Typography variant="headline">Working On</Typography>
              <Divider className={classes.divider} />
            </Grid>
            <p>WORKING ON THIS FEATURE</p>
          </div>
          <Hidden smDown>
            <div className={classes.itemContainer}>
              <Grid item xs={12} classes={{ item: classes.item }}>
                <Typography variant="headline">Social</Typography>
                <Divider className={classes.divider} />
              </Grid>
              <List classes={{ root: classes.socialList }} component="nav">
                <ListItem
                  button
                  component={Button}
                  href="https://www.twitter.com/noincomedev/"
                >
                  <ListItemIcon>
                    <i className="fab fa-twitter fa-2x" />
                  </ListItemIcon>
                  <ListItemText primary="TWEET!" />
                </ListItem>
                <ListItem
                  button
                  component={Button}
                  href="https://www.instagram.com/noincomedev/"
                >
                  <ListItemIcon>
                    <i className="fab fa-instagram fa-2x" />
                  </ListItemIcon>
                  <ListItemText primary="FOLLOW ME" />
                </ListItem>
                <ListItem
                  button
                  component={Button}
                  href="https://github.com/noincomedev/meteor-blog"
                >
                  <ListItemIcon>
                    <i className="fab fa-github fa-2x" />
                  </ListItemIcon>
                  <ListItemText primary="STAR" />
                </ListItem>
              </List>
            </div>
          </Hidden>
          <div className={classes.itemContainer}>
            <Grid item xs={12} classes={{ item: classes.item }}>
              <Typography variant="headline">Newsletter</Typography>
              <Divider className={classes.divider} />
            </Grid>
            <SubscribeToNewsletter />
          </div>
          <div className={classes.itemContainer}>
            <section className={classes.supportSection}>
              <Typography color="secondary" variant="body2">
                This blog will run ad-free forever.
              </Typography>
              <Typography color="secondary" variant="body2">
                Support my job!
              </Typography>
              <Button
                variant="raised"
                color="primary"
                href="https://www.buymeacoffee.com/noincomedev"
              >
                Buy me a coffee
                <i className="fas fa-coffee" />
              </Button>
            </section>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        justify="space-around"
        classes={{ container: classes.feedsContainer }}
        spacing={16}
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          classes={{ item: classes.twitterContainer }}
        >
          <i
            className={classNames("fab fa-twitter fa-3x", classes.twitterIcon)}
          />
          <Typography
            color="secondary"
            variant="display3"
            classes={{ display3: classes.twitterLogo }}
          >
            Twitter
          </Typography>
          <Timeline
            dataSource={{ sourceType: "profile", screenName: "noincomedev" }}
            options={{ username: "Noincomedev", height: "600" }}
            onLoad={() => {}}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          classes={{ item: classes.instagramContainer }}
        >
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
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(LandingPage);
