import React from "react";
import { PropTypes } from "prop-types";

import PrivateList from "./PrivateList";
import PublicList from "./PublicList";

const List = ({ user }) =>
  user ? <PrivateList user={user} /> : <PublicList />;

List.propTypes = {
  user: PropTypes.object
};

export default List;
