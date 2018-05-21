import React, { Fragment } from "react";
import { PropTypes } from "prop-types";

import CardWithTitleAndContent from "../layouts/components/card/CardWithTitleAndContent";
import SignupForm from "../components/accounts/SignupForm";

const SignupPage = ({ name }) => (
  <CardWithTitleAndContent title={name} content={SignupForm} />
);

SignupPage.propTypes = {
  name: PropTypes.string
};

export default SignupPage;
