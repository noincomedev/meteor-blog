import Posts from "./Posts";

export default {
  Query: {
    posts(obj, args, { userId }) {
      return Posts.find({ owner: userId }).fetch({});
    },
    post(obj, { slug }, { userId }) {
      return Posts.findOne({ slug });
    }
  },
  Post: {},
  Mutation: {
    createPost(obj, { title, slug, content, tags }, { userId }) {
      if (userId) {
        const postId = Posts.insert({
          owner: userId,
          title,
          slug,
          content,
          tags
        });
        return postId;
      }
      throw new Error("Unauthorized");
    },
    editPost(obj, args, { userId }) {
      if (userId) {
        const postId = Posts.update({ _id: args._id }, { $set: args });
        return postId;
      }
      throw new Error("Unauthorized");
    }
  }
};
