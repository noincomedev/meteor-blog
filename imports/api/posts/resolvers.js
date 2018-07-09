import Posts from "./Posts";
import History from "../history/History";

export default {
  Query: {
    posts(obj, args, { userId }) {
      return Posts.find(
        { owner: userId, status: true },
        { sort: { created: -1 } }
      ).fetch({});
    },
    post(obj, { slug }, { userId }) {
      return Posts.findOne({ slug, status: true });
    },
    publicPosts(obj, args, ctx) {
      return Posts.find(
        { status: true, published: true, private: false },
        { sort: { created: -1 } }
      ).fetch({});
    }
  },
  Post: {
    new: post => moment(new Date()).diff(post.created, "days") <= 5,
    intro: post => post.content.substring(0, 200) + `... Continue Reading.`
  },
  Mutation: {
    createPost(
      obj,
      { title, imageUrl, slug, content, category, tags },
      { userId }
    ) {
      if (userId) {
        const postId = Posts.insert({
          owner: userId,
          title,
          imageUrl,
          slug,
          category,
          content,
          tags
        });
        History.insert({
          userId: userId,
          owner: postId,
          action: "create",
          type: "post"
        });
        return postId;
      }
      throw new Error("Unauthorized");
    },
    editPost(obj, args, { userId }) {
      if (userId) {
        const { _id } = args;
        const postId = Posts.update({ _id: args._id }, { $set: args });
        History.insert({
          userId: userId,
          owner: _id,
          action: "edit",
          type: "post"
        });
        return postId;
      }
      throw new Error("Unauthorized");
    },
    deletePost(obj, args, { userId }) {
      if (userId) {
        const { _id } = args;
        const postId = Posts.update(
          { _id: args._id },
          { $set: { status: false } }
        );
        History.insert({
          userId: userId,
          owner: _id,
          action: "delete",
          type: "post"
        });
        return postId;
      }
      throw new Error("Unauthorized");
    },
    togglePostPrivacy(obj, args, { userId }) {
      if (userId) {
        const { _id, private } = args;
        const postId = Posts.update(
          { _id, owner: userId },
          { $set: { private } }
        );
        History.insert({
          userId: userId,
          owner: _id,
          action: private ? "private" : "public",
          type: "post"
        });
        return postId;
      }
      throw new Error("Unauthorized");
    }
  }
};
