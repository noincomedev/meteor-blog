import React from "react";
import classNames from "classnames";
import compose from "recompose/compose";
import { Query } from "react-apollo";
import { PropTypes } from "prop-types";

import Item from "./Item";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Dashboard from "@material-ui/icons/Dashboard";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Timeline from "@material-ui/icons/Timeline";
import ViewList from "@material-ui/icons/ViewList";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import { USER_PROJECTS } from "../../../layouts/pages/PrivateWipPageLayout";

import Spinner from "../../utils/Spinner";
import Subitem from "./Subitem";

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      height: "100%"
    }
  },
  miniDrawerPaper: {
    width: 60,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth
    },
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  drawerInner: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

let getDrawerType = width => {
  switch (width) {
    case "xs":
      return "temporary";
      break;
    case "lg":
      return "permanent";
      break;
    case "xl":
      return "permanent";
      break;
    default:
      return "permanent";
      break;
  }
};

const Private = ({ classes, open, toggleDrawer, theme, width }) => {
  return (
    <Query query={USER_PROJECTS} variables={{ owner: Meteor.userId() }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error!: ${error}`;
        const { projects } = data;
        return (
          <Drawer
            variant={getDrawerType(width)}
            open={open}
            onClose={toggleDrawer}
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !open && classes.miniDrawerPaper
              )
            }}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={toggleDrawer}>
                  {theme.direction === "rtl" ? (
                    <ChevronRight />
                  ) : (
                    <ChevronLeft />
                  )}
                </IconButton>
              </div>
              <Divider />
            </div>
            <List>
              <Item linkTo="/" text="Dashboard">
                <Dashboard />
              </Item>
              <Item linkTo="/posts" text="Posts">
                <ViewList />
              </Item>
              <Item linkTo="/wip" text="WIP">
                <Timeline />
              </Item>
              {projects.map(project => (
                <Subitem key={project._id} project={project} />
              ))}
            </List>
          </Drawer>
        );
      }}
    </Query>
  );
};

Private.propTypes = {};

export default compose(
  withWidth(),
  withStyles(styles, { withTheme: true })
)(Private);
