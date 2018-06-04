import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 3,
    minHeight: "25vh",
    maxHeight: "40vh",
    backgroundColor: theme.palette.primary.dark
  },
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    color: theme.palette.secondary.light
  },
  mapre: {
    color: theme.palette.secondary.main
  }
});

const Content = ({ classes }) => (
  <Grid container classes={{ container: classes.container }}>
    <Grid item xs={12} classes={{ item: classes.item }}>
      <Typography classes={{ display2: classes.logo }} variant="display2">
        Learn
      </Typography>
      <Typography classes={{ display4: classes.mapre }} variant="display4">
        #MAPRE
      </Typography>
      <Typography classes={{ display2: classes.logo }} variant="display2">
        Stack!
      </Typography>
    </Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(Content);
