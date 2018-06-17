import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ChevronRight from "@material-ui/icons/ChevronRight";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  icon: { marginRight: theme.spacing.unit },
  root: { padding: 0, paddingLeft: "15%" },
  textRoot: { paddingLeft: 0 }
});

const Subitem = ({ classes, children, project }) => (
  <ListItem
    classes={{ root: classes.root }}
    button
    component={Link}
    to={`/projects/${project._id}`}
  >
    <ListItemIcon classes={{ root: classes.icon }}>
      <ChevronRight color="inherit" />
    </ListItemIcon>
    <ListItemText classes={{ root: classes.textRoot }} primary={project.name} />
  </ListItem>
);

Subitem.propTyes = {
  project: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Subitem);
