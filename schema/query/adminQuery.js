import { gql } from 'apollo-server-express';
import db from '../../tools/db';

const typeDefs = gql`
  type Query {
    admin(id: ID!): Admin
  }
`;
const resolvers = {
  Query: {
    admin: async (root, args) => {
      const { id } = args;
      const res = await db.select('admin', { id });
      return res[0];
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
