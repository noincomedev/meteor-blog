import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import merge from "lodash/merge";

import UserSchema from "../../../api/users/User.graphql";
import UserResolvers from "../../../api/users/resolvers";

import PostSchema from "../../../api/posts/Post.graphql";
import PostResolvers from "../../../api/posts/resolvers";

import ProjectSchema from "../../../api/projects/Project.graphql";
import ProjectResolvers from "../../../api/projects/resolvers";

import TaskSchema from "../../../api/tasks/Task.graphql";
import TaskResolvers from "../../../api/tasks/resolvers";

const typeDefs = [UserSchema, PostSchema, ProjectSchema, TaskSchema];

const resolvers = merge(
  UserResolvers,
  PostResolvers,
  ProjectResolvers,
  TaskResolvers
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer({ schema });
