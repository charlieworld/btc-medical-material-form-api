import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Mutation {
    login(admin: addAdminInput!): Token
    addAdmin(admin: addAdminInput!): Admin
    changePassword(password: changeAdminPasswordInput!): Admin
  }

  input changeAdminPasswordInput {
    oldKey: String!
    newKey: String!
  }
`;

const resolvers = {
  Mutation: {
    login: async (parent, { admin }, context) => context.authModel.login(admin),
    addAdmin: async (parent, { admin }, context) => context.authModel.signUp(admin),
    changePassword: async (
      parent,
      { password },
      context,
    ) => context.authModel.changePassword(password, context.me),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
