import { Accounts } from "meteor/accounts-base";

Accounts.onCreateUser((options, user) => {
  user.profile = { admin: true };
  return user;
});

Accounts.validateNewUser(user => Meteor.settings.public.validateNewUser);
