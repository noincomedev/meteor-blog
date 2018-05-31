import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import CardWithTitleAndContent from "../layouts/components/card/CardWithTitleAndContent";

const styles = theme => ({
  card: {
    backgroundColor: theme.palette.primary.main
  },
  divider: {
    color: "white"
  },
  title: {
    color: theme.palette.custom.error
  },
  subtitle: {
    color: theme.palette.grey[300]
  }
});

const NotFoundPage = ({ classes }) => (
  <Grid
    container
    justify="center"
    style={{ overflow: "auto", marginRight: 16 }}
  >
    <Grid item xs={12} sm={6}>
      <Card className={classes.card}>
        <CardHeader
          title={
            <Typography
              align="center"
              variant="display4"
              className={classes.title}
            >
              404
            </Typography>
          }
        />
        <Divider light />
        <CardContent>
          <Typography
            align="center"
            variant="display2"
            className={classes.subtitle}
          >
            NOT FOUND
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(NotFoundPage);
