import React, { Fragment } from "react";
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
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

import PostListLayout from "../layouts/components/list/PostListLayout";

const styles = theme => ({
  avatar: {
    height: 200,
    width: 200,
    border: `${theme.spacing.unit / 2}px ${theme.palette.primary.main} solid`,
    alignSelf: "center"
  },
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
    padding: theme.spacing.unit
  }
});

const LandingPage = ({ classes }) => (
  <Grid container alignItems="flex-start" spacing={16}>
    <Grid item xs={12} md={8}>
      <PostListLayout />
    </Grid>
    <Grid item xs={12} md={4}>
      <div className={classes.itemContainer}>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Typography variant="headline">Recent Activity</Typography>
          <Divider />
        </Grid>
        <p>WORKING ON THIS FEATURE</p>
      </div>
      <div className={classes.itemContainer}>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Typography variant="headline">Working On</Typography>
          <Divider />
        </Grid>
        <p>WORKING ON THIS FEATURE</p>
      </div>
      <Hidden smDown>
        <div className={classes.itemContainer}>
          <Grid item xs={12} classes={{ item: classes.item }}>
            <Typography variant="headline">Social</Typography>
            <Divider />
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
            fullWidth
            href="https://www.buymeacoffee.com/noincomedev"
          >
            Buy me a coffee
            <i className="fas fa-coffee" />
          </Button>
        </section>
      </div>
    </Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(LandingPage);
