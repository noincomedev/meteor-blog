import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Posts = new Mongo.Collection("posts");

Posts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Posts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Posts.schema = new SimpleSchema({
  owner: {
    type: String,
    label: "ID of the User this document belongs to.",
    optional: false
  },
  status: {
    type: Boolean,
    autoValue() {
      if (this.isInsert) return true;
    }
  },
  published: {
    type: Boolean,
    autoValue() {
      if (this.isInsert) return true;
    }
  },
  created: {
    type: String,
    label: "The date this company was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updated: {
    type: String,
    label: "The date this company was last updated.",
    optional: false,
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  title: {
    type: String,
    label: "The title of this post.",
    optional: false
  },
  slug: {
    type: String,
    label: "The slug of this post.",
    optional: false
  },
  content: {
    type: String,
    label: "The content of this post.",
    optional: false
  },
  tags: {
    type: Array,
    label: "The tags of this post."
  },
  "tags.$": {
    type: String
  },
  category: {
    type: String,
    label: "The category of this post.",
    optional: false
  },
  imageUrl: {
    type: String,
    label: "The url image of this post.",
    optional: true
  }
});

Posts.attachSchema(Posts.schema);

export default Posts;
