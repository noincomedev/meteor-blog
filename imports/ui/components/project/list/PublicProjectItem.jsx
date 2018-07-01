import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Lock from "@material-ui/icons/Lock";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  lock: {
    color: theme.palette.grey[300]
  },
  secondaryAction: {
    display: "inline-flex",
    alignItems: "center"
  }
});

const PublicProjectItem = ({ classes, project }) => (
  <ListItem button component={Link} to={`/projects/${project._id}`}>
    <Avatar alt="Project Cover Image" src={project.imageUrl} />
    <ListItemText primary={project.name} />
  </ListItem>
);

PublicProjectItem.propTypes = {
  project: PropTypes.object.isRequired
};

export default withStyles(styles)(PublicProjectItem);
