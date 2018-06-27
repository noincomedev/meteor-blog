import React, { Component } from "react";
import { PropTypes } from "prop-types";

import PrivateTaskItem from "../../../components/task/list/PrivateTaskItem";
import TaskForm from "../../../components/task/TaskForm";

class EditableTaskItemLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: false
    };
  }

  toggleForm = () => {
    this.setState({ formVisible: !this.state.formVisible });
  };

  render() {
    const { task } = this.props;
    const { formVisible } = this.state;
    if (formVisible) {
      return (
        <TaskForm
          task={task}
          onToggleControls={this.toggleForm}
          showCancelButton={true}
        />
      );
    } else {
      return <PrivateTaskItem task={task} onToggleForm={this.toggleForm} />;
    }
  }
}

EditableTaskItemLayout.propTypes = {
  task: PropTypes.object.isRequired
};

export default EditableTaskItemLayout;
