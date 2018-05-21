import React from "react";
import { PropTypes } from "prop-types";

import CardWithTitleAndContent from "../layouts/components/card/CardWithTitleAndContent";
import SigninForm from "../components/accounts/SigninForm";

const SigninPage = ({ name }) => (
  <CardWithTitleAndContent title={name}>
    <SigninForm />
  </CardWithTitleAndContent>
);

SigninPage.propTypes = {
  name: PropTypes.string
};

export default SigninPage;
