import React from "react";
import { PropTypes } from "prop-types";
import { CircularProgress } from "material-ui/Progress";
import purple from "material-ui/colors/purple";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  container: {
    margin: "auto"
  }
});

let Spinner = ({ classes, size, theme }) => (
  <div className={classes.container}>
    <CircularProgress
      size={size ? size : 50}
      color="secondary"
      variant="indeterminate"
    />
  </div>
);

export default withStyles(styles, { withTheme: true })(Spinner);
