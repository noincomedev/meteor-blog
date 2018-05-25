import React from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  customToolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    minHeight: 64
  },
  link: {
    color: theme.palette.custom.text,
    textDecoration: "none"
  },
  name: {
    color: theme.palette.custom.success
  },
  typoContainer: { flex: 1 }
});

const PublicToolbar = ({ classes, name }) => (
  <Toolbar className={classes.customToolbar}>
    <div className={classes.typoContainer}>
      <Typography variant="body1">
        <Link className={classes.link} to="/">
          NOINCOMEBLOG
        </Link>
      </Typography>
    </div>
    <Typography className={classes.name} variant="body1">
      {name}
    </Typography>
  </Toolbar>
);

export default withStyles(styles, { withTheme: true })(PublicToolbar);
