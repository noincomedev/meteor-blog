import Projects from "./Projects";

export default {
  Query: {
    projects(obj, args, { userId }) {
      return Projects.find(
        { owner: userId, status: true },
        { sort: { created: -1 } }
      ).fetch({});
    },
    project(obj, args, { userId }) {
      return Projects.findOne({ owner: userdId, status: true });
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
    }
  }
};
