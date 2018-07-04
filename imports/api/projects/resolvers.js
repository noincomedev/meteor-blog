import Projects from "./Projects";
import Tasks from "../tasks/Tasks";
import History from "../history/History";

export default {
  Query: {
    projects(obj, args, { userId }) {
      return Projects.find(
        { owner: userId, status: true },
        { sort: { created: -1 } }
      ).fetch({});
    },
    project(obj, { _id }, { userId }) {
      if (userId) {
        return Projects.findOne({ owner: userId, _id, status: true });
      } else {
        return Projects.findOne({ _id, status: true });
      }
    },
    publicProjects(obj, args, context) {
      return Projects.find({ status: true, private: false }).fetch({});
    }
  },
  Project: {
    tasks: project =>
      Tasks.find(
        { owner: project._id, status: true },
        { sort: { created: -1 } }
      ).fetch({}),
    tasksCount: project => {
      const tasks = Tasks.find({ owner: project._id }).fetch({});
      return tasks.length;
    },
    completedTasksCount: project => {
      const completedTasks = Tasks.find({
        owner: project._id,
        completed: true,
        status: true,
        archived: true
      }).fetch({});
      return completedTasks.length;
    },
    activeTasksCount: project => {
      const activeTasks = Tasks.find({
        owner: project._id,
        status: true,
        archived: false
      }).fetch({});
      return activeTasks.length;
    }
  },
  Mutation: {
    createProject(obj, { name, description, imageUrl, tag }, { userId }) {
      if (userId) {
        const projectId = Projects.insert({
          owner: userId,
          name,
          description,
          imageUrl,
          tag
        });
        History.insert({
          userId: userId,
          owner: projectId,
          action: "create",
          type: "project"
        });
        return projectId;
      }
      throw new Error("Unauthorized");
    },
    editProject(obj, args, { userId }) {
      if (userId) {
        const { _id } = args;
        const projectId = Projects.update({ _id: args._id }, { $set: args });
        History.insert({
          userId: userId,
          owner: _id,
          action: "edit",
          type: "project"
        });
        return projectId;
      }
      throw new Error("Unauthorized");
    },
    deleteProject(obj, args, { userId }) {
      if (userId) {
        const { _id } = args;
        const projectId = Projects.update(
          { _id: args._id },
          { $set: { status: false } }
        );
        History.insert({
          userId: userId,
          owner: _id,
          action: "delete",
          type: "project"
        });
        return projectId;
      }
      throw new Error("Unauthorized");
    },
    togglePrivate(obj, args, { userId }) {
      if (userId) {
        const { _id } = args;
        const projectId = Projects.update(
          { _id: args._id, owner: userId },
          { $set: { private: args.private } }
        );
        History.insert({
          userId: userId,
          owner: _id,
          action: args.private ? "private" : "public",
          type: "project"
        });
        return projectId;
      }
      throw new Error("Unauthorized");
    }
  }
};
