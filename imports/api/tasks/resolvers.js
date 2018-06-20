import Tasks from "./Tasks";
import Projects from "../projects/Projects";

export default {
  Query: {
    tasks(obj, args, { userId }) {
      const { _id } = args;
      return Tasks.find({ owner: _id }, { sort: { created: -1 } }).fetch({});
    }
  },
  Task: {
    tag: task => {
      const project = Projects.findOne({ _id: task.owner });
      return `@${project.tag}#${task._id.substring(0, 4)}`;
    }
  },
  Mutation: {
    createTask(obj, { owner, name, description }, { userId }) {
      if (userId) {
        const taskId = Tasks.insert({
          owner,
          name,
          description
        });
        return taskId;
      }
      throw new Error("Unauthorized");
    },
    editTask(obj, args, { userId }) {
      if (userId) {
        const taskId = Tasks.update({ _id: args._id }, { $set: args });
        return taskId;
      }
      throw new Error("Unauthorized");
    }
  }
};
