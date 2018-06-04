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

const Apollo = ({ classes, color, size }) => (
  <SvgIcon
    color={color ? color : "inherit"}
    classes={{
      root: classNames(size == "lg" && classes.lg)
    }}
    viewBox="0 0 256 256"
  >
    <path d="M160.227 178.519h27.63L143.75 64.049h-30.549l-44.107 114.47h27.632l7.208-19.39h41.675l-7.544-21.456h-27.44l17.85-49.254 31.752 90.1zm91.112-84.751a6.641 6.641 0 0 0-8.185-4.627 6.648 6.648 0 0 0-4.628 8.183A114.646 114.646 0 0 1 242.704 128c0 63.248-51.456 114.702-114.704 114.702-63.248 0-114.703-51.454-114.703-114.702C13.297 64.751 64.752 13.296 128 13.296c26.793 0 52.718 9.518 73.179 26.456a15.938 15.938 0 0 0-1.238 6.173c0 8.835 7.162 15.997 15.997 15.997s15.997-7.162 15.997-15.997-7.162-15.997-15.997-15.997c-1.701 0-3.338.271-4.876.763C188.022 11.056 158.513 0 128 0 57.421 0 0 57.42 0 128c0 70.579 57.421 127.999 128 127.999 70.579 0 128-57.42 128-127.999a127.95 127.95 0 0 0-4.661-34.232z" />
  </SvgIcon>
);

Meteor.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(Apollo);
