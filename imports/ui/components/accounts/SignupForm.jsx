import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Bert } from "meteor/themeteorchef:bert";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../utils/Spinner";

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 2
  }
});

class SignupForm extends Component {
  state = { email: "", loading: false, password: "" };

  handleChange = name => event => {
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { client } = this.props;
    this.toggleLoading();
    Accounts.createUser(this.state, error => {
      if (!error) client.resetStore();

      Bert.alert({
        title: error ? "Error!" : "Success",
        message: error
          ? error.reason
          : "Thanks for signup, you are now logged in",
        type: error ? "danger" : "success",
        style: "growl-top-right",
        icon: error ? "fa-remove" : "fa-check"
      });
      this.toggleLoading();
    });
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    const { classes } = this.props;
    const { email, loading, password } = this.state;

    return (
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <Grid item xs={12}>
              <TextField
                type="email"
                label="e-mail"
                value={email}
                onChange={this.handleChange("email")}
                margin="none"
                autoFocus
                fullWidth
                required
              />
              <TextField
                type="password"
                label="password"
                value={password}
                onChange={this.handleChange("password")}
                fullWidth
              />
            </Grid>
            <Grid
              container
              className={classes.container}
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} md={6}>
                <Button
                  color="secondary"
                  variant="raised"
                  type="submit"
                  fullWidth
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withApollo(SignupForm));
