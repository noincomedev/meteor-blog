import { Accounts } from "meteor/accounts-base";

Accounts.onCreateUser((options, user) => {
  if (options.email == "diego@hemployeed.com") user.profile = { admin: true };
  return user;
});

Accounts.validateNewUser(user => {
  if (user.emails[0].address == "diego@hemployeed.com") return true;
  else {
    throw new Meteor.Error(403, "Signup Disabled");
  }
});
