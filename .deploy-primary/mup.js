module.exports = {
  servers: {
    one: {
      host: "204.48.26.223",
      username: "root",
      pem: "/Users/gurofo/.ssh/id_rsa"
    }
  },
  app: {
    name: "noincomedev",
    path: "/Users/gurofo/Development/Meteor/Projects/noincomedev/blog",
    type: "meteor",
    docker: {
      image: "abernix/meteord:node-8.4.0-base"
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      PORT: 3000,
      MONGO_URL:
        "mongodb://admin:Diegoro1108@ds161459.mlab.com:61459/noincomeblog",
      ROOT_URL: "https://www.noincomedev.me"
    },
    enableUploadProgressBar: true,
    deployCheckWaitTime: 150
  }
};
