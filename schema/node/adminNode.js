import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Admin {
    id: ID!
    name: String
    key: String
    data: Data
    created_at: TimeStamp
    updated_at: TimeStamp
  }

  input addAdminInput {
    name: String!
    key: String!
  }

  input changeAdminPasswordInput {
    oldKey: String!
    newKey: String!
  }
`;

const resolvers = {
};

module.exports = {
  typeDefs,
  resolvers,
};
