import Posts from "./Posts";

export default {
  Query: {
    posts(obj, args, { userId }) {
      return Posts.find({}).fetch({});
    }
  },
  Post: {},
  Mutation: {}
};
