import Posts from "./Posts";

export default {
  Query: {
    posts(obj, args, { userId }) {
      return Posts.find({ owner: userId, status: true }).fetch({});
    },
    post(obj, { slug }, { userId }) {
      return Posts.findOne({ slug, status: true });
    },
    publicPosts(obj, args, ctx) {
      return Posts.find({ status: true, published: true }).fetch({});
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
    },
    deletePost(obj, args, { userId }) {
      if (userId) {
        const postId = Posts.update(
          { _id: args._id },
          { $set: { status: false } }
        );
        return postId;
      }
      throw new Error("Unauthorized");
    }
  }
};
