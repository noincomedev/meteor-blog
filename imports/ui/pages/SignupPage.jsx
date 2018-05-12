import React, { Fragment } from "react";
import { PropTypes } from "prop-types";

import CardTemplate from "../layouts/components/card/withTitleAndContent";
import SignupForm from "../components/accounts/SignupForm";

const SignupPage = ({ name }) => (
  <CardTemplate title={name} content={SignupForm} />
);

SignupPage.propTypes = {
  name: PropTypes.string
};

export default SignupPage;
