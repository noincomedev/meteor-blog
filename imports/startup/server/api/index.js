import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import merge from "lodash/merge";

import UserSchema from "../../../api/users/User.graphql";
import UserResolvers from "../../../api/users/resolvers";

import PostSchema from "../../../api/posts/Post.graphql";
import PostResolvers from "../../../api/posts/resolvers";

// aaaaa

const typeDefs = [UserSchema, PostSchema];

const resolvers = merge(UserResolvers, PostResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer({ schema });
