import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const Item = ({ children, text, linkTo }) => (
  <ListItem button component={Link} to={linkTo}>
    <ListItemIcon>{children}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

Item.propTypes = {
  children: PropTypes.element.isRequired,
  linkTo: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Item;
