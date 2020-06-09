import { gql } from 'apollo-server-express';
import db from '../../tools/db';
import k from '../../tools/key';
import token from '../../tools/token';

const typeDefs = gql`
  type Mutation {
    login(admin: addAdminInput!): Token
  }
`;

const resolvers = {
  Mutation: {
    login: async (parent, { admin }) => {
      const { name, key } = admin;
      const user = await db.select('admin', { name });
      if (!user) throw new Error('Admin Not Exists');
      const passwordIsValid = await k.compare(key, user[0].key);
      if (!passwordIsValid) throw new Error('Wrong Password');
      return { token: token.forge(user[0]) };
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
