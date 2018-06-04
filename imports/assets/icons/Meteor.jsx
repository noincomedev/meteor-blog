import React from "react";
import classNames from "classnames";

import SvgIcon from "@material-ui/core/SvgIcon";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  lg: {
    fontSize: 68
  }
});

const Meteor = ({ classes, color, size }) => (
  <SvgIcon
    color={color ? color : "inherit"}
    viewBox="0 0 256 256"
    classes={{
      root: classNames(size == "lg" && classes.lg)
    }}
  >
    <path d="M.439.438L219.3 232.266s7.457 5.259 13.158-.877c5.702-6.135 1.316-12.27 1.316-12.27L.44.439zM69.738 22.35l166.668 179.677s7.456 5.26 13.158-.876c5.702-6.135 1.316-12.27 1.316-12.27L69.738 22.35zM21.053 69.242L187.72 248.919s7.456 5.259 13.158-.877c5.702-6.135 1.316-12.27 1.316-12.27L21.053 69.242zM128.32 41.194l116.442 125.53s5.21 3.674 9.193-.612c3.983-4.287.919-8.573.919-8.573L128.321 41.194zM37.092 123.583l116.441 125.53s5.21 3.674 9.193-.613c3.983-4.286.919-8.572.919-8.572L37.092 123.583zM188.16 68.365l52.775 57.067s2.577 1.722 4.547-.287c1.97-2.008.455-4.017.455-4.017L188.16 68.365zM66.229 181.43l52.775 57.067s2.577 1.722 4.547-.286c1.97-2.009.455-4.017.455-4.017L66.229 181.43z" />
  </SvgIcon>
);

Meteor.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(Meteor);
