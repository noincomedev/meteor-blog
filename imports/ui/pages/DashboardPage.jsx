import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const styles = theme => ({
  card: {
    display: "flex",
    margin: theme.spacing.unit
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  container: {
    backgroundColor: theme.palette.custom.text
  },
  content: { flex: 1, display: "flex", alignItems: "center" },
  icon: {
    color: "white",
    margin: theme.spacing.unit
  }
});

class DashboardPage extends Component {
  state = {
    raised: false
  };

  toggleRaised = () => {
    this.setState({ raised: !this.state.raised });
  };

  render() {
    const { classes } = this.props;
    const { raised } = this.state;

    return (
      <Fragment>
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={6} component={Link} to="/posts">
            <Card
              raised={raised}
              className={classes.card}
              onMouseLeave={this.toggleRaised}
              onMouseEnter={this.toggleRaised}
            >
              <Grid container className={classes.container}>
                <Grid item xs={2}>
                  <i className={`${classes.icon} fas fa-list fa-2x`} />
                </Grid>
                <Grid item xs={10} className={classes.content}>
                  <Typography color="primary" variant="headline">
                    Posts
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withApollo(
  withStyles(styles, { withTheme: true })(DashboardPage)
);
