import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import ListLayout from "../../layouts/ListLayout";

const List = ({ admin, loading }) => {
  if (loading) return <h1>LOADING</h1>;
  return <ListLayout admin={admin} />;
};

const posts = gql`
  query Posts {
    posts {
      _id
      owner
      slug
      title
      content
    }
  }
`;

export default graphql(posts, {
  props: ({ data }) => ({ ...data })
})(List);
