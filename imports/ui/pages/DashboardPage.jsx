import React, { Component, Fragment } from "react";
import { withApollo } from "react-apollo";

class DashboardPage extends Component {
  handleLogout = () => {
    const { client } = this.props;
    Meteor.logout(error => {
      if (!error) client.resetStore();
    });
  };

  render() {
    return (
      <Fragment>
        <h1>DashboardPage</h1>
        <button onClick={this.handleLogout}>Logout</button>
      </Fragment>
    );
  }
}

export default withApollo(DashboardPage);
