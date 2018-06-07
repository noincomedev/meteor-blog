import React, { Component } from "react";
import Recaptcha from "react-recaptcha";
import { HTTP } from "meteor/http";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../utils/Spinner";

const styles = theme => ({
  form: {
    display: "flex",
    flex: 1,
    alignItems: "center"
  },
  input: {
    color: `${theme.palette.grey[200]} !important`
  },
  newsletterContainer: {
    marginTop: theme.spacing.unit,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing.unit
  },
  newsletterSubheading: { color: theme.palette.grey[300] },
  raisedSecondary: {
    padding: 0,
    backgroundColor: theme.palette.custom.text
  }
});

class SubscribeToNewsletter extends Component {
  state = {
    email: "",
    showCaptcha: false,
    showSpinner: false,
    showResponse: false
  };

  handleChange = event => {
    let name = event.target.id,
      value = event.target.value.trim();

    this.setState({ [name]: value });
  };

  handleCaptchaCallback = () => {
    this.showCaptcha();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.showCaptcha();
  };

  postMember = () => {
    Meteor.call("postMemberToList", this.state.email, response => {
      this.showResponse();
    });
  };

  showCaptcha = () => {
    this.setState({
      showSpinner: false,
      showResponse: false,
      showCaptcha: true
    });
  };

  showSpinner = () => {
    this.setState({
      showCaptcha: false,
      showResponse: false,
      showSpinner: true
    });
  };

  verifyCallback = response => {
    this.showResponse();
  };

  showResponse = () => {
    this.setState({
      showCaptcha: false,
      showSpinner: false,
      showResponse: true
    });
  };

  render() {
    const { classes } = this.props;
    const { email, showCaptcha, showSpinner, showResponse } = this.state;
    console.log(Meteor.settings.public.CAPTCHA_KEY);
    if (showCaptcha)
      return (
        <Recaptcha
          sitekey={Meteor.settings.public.CAPTCHA_KEY}
          render="explicit"
          theme="dark"
          onloadCallback={this.handleCaptchaCallback}
          verifyCallback={this.verifyCallback}
        />
      );
    if (showSpinner) return <Spinner />;
    if (showResponse)
      return (
        <Grid
          classes={{ container: classes.newsletterContainer }}
          container
          alignItems="center"
        >
          <Typography
            variant="caption"
            classes={{ caption: classes.newsletterSubheading }}
          >
            your email {email} has been added to our list!.
          </Typography>
        </Grid>
      );
    return (
      <Grid
        classes={{ container: classes.newsletterContainer }}
        container
        alignItems="center"
      >
        <Typography
          variant="caption"
          classes={{ caption: classes.newsletterSubheading }}
        >
          Do you want to get the best of my content? Subscribe to my newsletter!
          I promise no spam! 1 or 2 emails monthly!
        </Typography>
        <form
          className={classes.form}
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <Grid item xs={12} sm={8}>
            <TextField
              required
              type="email"
              id="email"
              label="Email"
              value={email}
              onChange={this.handleChange}
              margin="none"
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{ classes: { root: classes.input } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              type="submit"
              variant="raised"
              color="secondary"
              fullWidth
              className={classes.raisedSecondary}
            >
              Subscribe!
            </Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SubscribeToNewsletter);
