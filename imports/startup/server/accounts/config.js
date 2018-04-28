import { Accounts } from "meteor/accounts-base";

Accounts.onCreateUser((options, user) => {
  if (options.email == "diego@hemployeed.com") user.profile = { admin: true };
  return user;
  s;
});
