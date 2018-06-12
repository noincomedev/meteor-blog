import React from "react";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const syles = theme => ({});

const PrivateWipPage = ({ classes }) => (
  <Grid container>
    <Grid item xs={12}>
      <Typography variant="title" color="inherit">
        Work in Progress
      </Typography>
      <Divider />
    </Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(PrivateWipPage);
