import { Meteor } from "meteor/meteor";

import "./accounts/config";
import "./api";

Meteor.startup(() => {
  console.log("server started");
});
