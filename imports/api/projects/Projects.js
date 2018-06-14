import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Projects = new Mongo.Collection("projects");

Projects.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Projects.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Projects.schema = new SimpleSchema({
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
  created: {
    type: String,
    label: "The date this project was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updated: {
    type: String,
    label: "The date this project was last updated.",
    optional: false,
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  name: {
    type: String,
    label: "The name of this project.",
    optional: false
  },
  description: {
    type: String,
    label: "The description of this project.",
    optional: false
  },
  imageUrl: {
    type: String,
    label: "The url image of this project.",
    optional: true
  }
});

Projects.attachSchema(Projects.schema);

export default Projects;
