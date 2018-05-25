import Posts from "./Posts";

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
        { status: true, published: true },
        { sort: { created: -1 } }
      ).fetch({});
    }
  },
  Post: {
    new: post => moment(new Date()).diff(post.created, "days") <= 5,
    intro: post => post.content.substring(0, 150)
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
