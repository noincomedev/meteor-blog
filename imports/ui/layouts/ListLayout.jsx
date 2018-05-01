import React from "react";

import PrivateList from "../components/list/PrivateList";
import PublicList from "../components/list/PublicList";

export default (ListLayout = ({ admin }) => {
  return admin ? <PrivateList /> : <PublicList />;
});
