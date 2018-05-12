import React from "react";
import { PropTypes } from "prop-types";

import CardTemplate from "../layouts/components/card/withTitleAndContent";
import SigninForm from "../components/accounts/SigninForm";

const SigninPage = ({ name }) => (
  <CardTemplate title={name} content={SigninForm} />
);

SigninPage.propTypes = {
  name: PropTypes.string
};

export default SigninPage;
