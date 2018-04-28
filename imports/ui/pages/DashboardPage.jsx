import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

class DashboardPage extends Component {
  handleLogout = () => {
    const { history } = this.props;
    Meteor.logout(error => {
      if (!error) history.push("/");
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

export default withRouter(props => <DashboardPage {...props} />);
