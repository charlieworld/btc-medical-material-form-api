import { gql, AuthenticationError } from 'apollo-server-express';
import db from '../../tools/db';

const typeDefs = gql`
  type Query {
    me: Admin
  }
`;

const resolvers = {
  Query: {
    me: async (root, args, { me }) => {
      if (!me) throw new AuthenticationError('Login First !');
      const res = await db.select('admin', me.id);
      return res[0];
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
