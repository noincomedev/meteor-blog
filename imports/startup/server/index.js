import { Meteor } from "meteor/meteor";

import "./accounts/config";
import "./api";

Meteor.startup(() => {
  console.log("server started");
  Meteor.methods({
    postMemberToList(email) {
      let url = `https://us18.api.mailchimp.com/3.0/lists/${
        Meteor.settings.MAILCHIMP_LIST_ID
      }/members/`;

      HTTP.post(
        url,
        {
          headers: { "Content-Type": "application/json" },
          data: { email_address: email, status: "subscribed" },
          auth: `noincomedev:${Meteor.settings.MAILCHIMP_API_KEY}`
        },
        (error, result) => {}
      );
    }
  });
});
