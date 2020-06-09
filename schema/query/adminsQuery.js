import { gql } from 'apollo-server-express';
import db from '../../tools/db';

const typeDefs = gql`
  type Query {
    admins: [Admin]
  }
`;
const resolvers = {
  Query: {
    admins: async () => {
      const res = await db.select('admin');
      return res;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
