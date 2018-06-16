import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

const PrivateProjectItem = ({ classes, project }) => (
  <ListItem dense button component={Link} to={`/projects/${project._id}`}>
    <Avatar alt="Project Cover Image" src={project.imageUrl} />
    <ListItemText primary={project.name} />
  </ListItem>
);

PrivateProjectItem.propTypes = {
  project: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PrivateProjectItem);
