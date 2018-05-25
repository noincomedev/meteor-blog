import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
    overflow: "auto"
  },
  divider: {
    marginLeft: 24,
    marginRight: 24
  },
  title: {
    fontSize: 14
  }
});

class CardWithTitleAndContent extends Component {
  state = {
    raised: false
  };

  toggleRaised = () => {
    if (this.props.hoverable) this.setState({ raised: !this.state.raised });
  };

  render() {
    const { children, content, classes, title } = this.props;
    const { raised } = this.state;
    return (
      <Grid
        container
        justify="center"
        style={{ overflow: "auto", marginRight: 16 }}
      >
        <Grid item xs={12} sm={6}>
          <Card
            raised={raised}
            className={classes.card}
            onMouseLeave={this.toggleRaised}
            onMouseEnter={this.toggleRaised}
          >
            <CardHeader className={classes.title} title={title} />
            <Divider className={classes.divider} />
            <CardContent>{children}</CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

CardWithTitleAndContent.propTypes = {
  hoverable: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.func,
  redirect: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(
  withRouter(CardWithTitleAndContent)
);
