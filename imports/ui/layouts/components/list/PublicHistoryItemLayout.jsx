import React, { Fragment } from "react";
import { PropTypes } from "prop-types";

import PublicHistoryTaskItem from "../../../components/history/list/PublicHistoryTaskItem";
import PublicHistoryProjectItem from "../../../components/history/list/PublicHistoryProjectItem";
import PublicHistoryPostItem from "../../../components/history/list/PublicHistoryPostItem";

const PublicHistoryItemLayout = ({ history }) => {
  const renderHistoryItem = () => {
    switch (history.type) {
      case "task":
        return history.task && <PublicHistoryTaskItem history={history} />;
      case "project":
        return (
          history.project && <PublicHistoryProjectItem history={history} />
        );
      case "post":
        return <PublicHistoryPostItem history={history} />;
      default:
        null;
    }
  };
  return <Fragment>{renderHistoryItem()}</Fragment>;
};

PublicHistoryItemLayout.propTypes = {
  history: PropTypes.object.isRequired
};

export default PublicHistoryItemLayout;
