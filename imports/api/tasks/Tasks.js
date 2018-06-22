import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Tasks = new Mongo.Collection("tasks");

Tasks.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Tasks.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Tasks.schema = new SimpleSchema({
  owner: {
    type: String,
    label: "ID of the Project this document belongs to.",
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
    label: "The date this task was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updated: {
    type: String,
    label: "The date this task was last updated.",
    optional: false,
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  name: {
    type: String,
    label: "The name of this task.",
    optional: false
  },
  description: {
    type: String,
    label: "The description of this task.",
    optional: false
  },
  completed: {
    type: String,
    label: "The date this task was completed.",
    optional: true
  },
  archived: {
    type: Boolean,
    label: "Flag archived.",
    optional: true,
    autoValue() {
      if (this.isInsert) return false;
    }
  }
});

Tasks.attachSchema(Tasks.schema);

export default Tasks;
