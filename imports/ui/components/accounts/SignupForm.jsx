import React, { Component } from "react";
import { Bert } from "meteor/themeteorchef:bert";
import { withApollo } from "react-apollo";

class SignupForm extends Component {
  state = { email: "", password: "" };

  handleChange = event => {
    const name = event.target.name,
      value = event.target.value;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { client } = this.props;
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
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <button type="submit">Signup</button>
      </form>
    );
  }
}

export default withApollo(SignupForm);
