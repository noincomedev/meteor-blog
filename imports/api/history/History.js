import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const History = new Mongo.Collection("history");

History.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

History.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

History.schema = new SimpleSchema({
  userId: {
    type: String,
    label: "ID of the user this document belongs to.",
    optional: false
  },
  owner: {
    type: String,
    label: "ID of the object-action that generated this event.",
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
    label: "The date this action was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updated: {
    type: String,
    label: "The date this action was last updated.",
    optional: false,
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  action: {
    type: String,
    label: "action on the task",
    optional: false
  },
  type: {
    type: String,
    label: "type schema model",
    optional: false
  }
});

History.attachSchema(History.schema);

export default History;
