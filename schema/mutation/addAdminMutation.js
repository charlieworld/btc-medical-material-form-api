import { gql } from 'apollo-server-express';
import db from '../../tools/db';
import k from '../../tools/key';
import uuid from '../../tools/uuid';

const typeDefs = gql`
  type Mutation {
    addAdmin(admin: addAdminInput!): Admin
  }
`;

const resolvers = {
  Mutation: {
    addAdmin: async (parent, { admin }) => {
      const { name, key } = admin;
      const oldUser = await db.single('admin', { name });
      if (oldUser) throw new Error(`Admin Name:[${name}] Already Exist !`);
      const hashedKey = await k.hash(key);
      const newAdminID = await db.insert('admin', {
        id: uuid.generate('admin'),
        name,
        key: hashedKey,
      });
      if (!newAdminID) {
        throw new Error('Add Admin failed!');
      }
      const res = await db.single('admin', { id: newAdminID });
      return res;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
