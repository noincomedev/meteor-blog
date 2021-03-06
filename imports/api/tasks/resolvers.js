import Tasks from "./Tasks";
import Projects from "../projects/Projects";
import History from "../history/History";

export default {
  Query: {
    tasks(obj, args, { userId }) {
      const { _id } = args;
      return Tasks.find(
        { owner: _id, archived: false },
        { sort: { created: -1 } }
      ).fetch({});
    }
  },
  Task: {
    tag: task => {
      const project = Projects.findOne({ _id: task.owner });
      return `@${project.tag}#${task._id.substring(0, 4)}`;
    }
  },
  Mutation: {
    archiveTask(obj, args, { userId }) {
      if (userId) {
        const taskId = Tasks.update(
          { _id: args._id },
          { $set: { archived: true } }
        );
        History.insert({
          userId: userId,
          owner: args._id,
          action: "archive",
          type: "task"
        });
        return taskId;
      }
      throw new Error("Unauthorized");
    },
    deleteTask(obj, args, { userId }) {
      if (userId) {
        const taskId = Tasks.update(
          { _id: args._id },
          { $set: { status: false } }
        );
        History.insert({
          userId: userId,
          owner: args._id,
          action: "delete",
          type: "task"
        });
        return taskId;
      }
      throw new Error("Unauthorized");
    },
    createTask(obj, { owner, name, description }, { userId }) {
      if (userId) {
        const taskId = Tasks.insert({
          owner,
          name,
          description
        });
        History.insert({
          userId: userId,
          owner: taskId,
          action: "create",
          type: "task"
        });
        return taskId;
      }
      throw new Error("Unauthorized");
    },
    editTask(obj, args, { userId }) {
      if (userId) {
        const { _id } = args;
        const taskId = Tasks.update({ _id: args._id }, { $set: args });
        History.insert({
          userId: userId,
          owner: _id,
          action: "edit",
          type: "task"
        });
        return taskId;
      }
      throw new Error("Unauthorized");
    },
    toggleTask(obj, args, { userId }) {
      if (userId) {
        const taskId = Tasks.update(
          { _id: args._id },
          { $set: { completed: args.completed } }
        );
        History.insert({
          owner: args._id,
          userId: userId,
          action: args.completed ? "finish" : "undo",
          type: "task"
        });
        return taskId;
      }
      throw new Error("Unauthorized");
    }
  }
};
