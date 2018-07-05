import React from "react";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import PublicHistoryList from "../../history/list/Public";
import PublicProjectList from "../../project/list/Public";
import SubscribeToNewsletter from "../../utils/SubscribeToNewsletter";

const styles = theme => ({
  donationContainer: {
    display: "flex",
    flexDirection: "column",
    justify: "center",
    alignContent: "center",
    padding: theme.spacing.unit / 2
  }
});

const MainSidenav = ({ classes }) => (
  <Grid container>
    <Grid item xs={12}>
      <Typography variant="headline">Working On</Typography>
      <Divider className={classes.divider} />
      <PublicProjectList />
    </Grid>
    <Grid item xs={12} classes={{ item: classes.item }}>
      <Typography variant="headline">Newsletter</Typography>
      <Divider className={classes.divider} />
      <SubscribeToNewsletter />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="headline">Donations</Typography>
      <Divider className={classes.divider} />
      <div className={classes.donationContainer}>
        <Button
          variant="raised"
          color="primary"
          href="https://www.buymeacoffee.com/noincomedev"
        >
          Buy me a coffee
          <i className="fas fa-coffee" />
        </Button>
        <Typography color="secondary" variant="caption">
          This blog will run ad-free forever. Support my job!
        </Typography>
      </div>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="headline">Activity</Typography>
      <Divider className={classes.divider} />
      <PublicHistoryList />
    </Grid>
  </Grid>
);

export default withStyles(styles)(MainSidenav);
