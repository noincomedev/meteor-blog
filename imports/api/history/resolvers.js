import History from "./History";
import Projects from "../projects/Projects";
import Tasks from "../tasks/Tasks";

export default {
  Query: {
    publicHistory(obj, args, context) {
      return History.find(
        { status: true },
        { sort: { created: -1 }, limit: 15 }
      ).fetch({});
    }
  },
  History: {
    project: history => Projects.findOne({ _id: history.owner }),
    task: history => Tasks.findOne({ _id: history.owner })
  },
  Mutation: {}
};
