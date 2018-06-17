import Projects from "./Projects";

export default {
  Query: {
    projects(obj, args, { userId }) {
      return Projects.find(
        { owner: userId, status: true },
        { sort: { created: -1 } }
      ).fetch({});
    },
    project(obj, { _id }, { userId }) {
      return Projects.findOne({ owner: userId, _id, status: true });
    }
  },
  Project: {},
  Mutation: {
    createProject(obj, { name, description, imageUrl }, { userId }) {
      if (userId) {
        const projectId = Projects.insert({
          owner: userId,
          name,
          description,
          imageUrl
        });
        return projectId;
      }
      throw new Error("Unauthorized");
    },
    editProject(obj, args, { userId }) {
      if (userId) {
        const projectId = Projects.update({ _id: args._id }, { $set: args });
        return projectId;
      }
      throw new Error("Unauthorized");
    },
    deleteProject(obj, args, { userId }) {
      if (userId) {
        const projectId = Projects.update(
          { _id: args._id },
          { $set: { status: false } }
        );
        return projectId;
      }
      throw new Error("Unauthorized");
    }
  }
};
