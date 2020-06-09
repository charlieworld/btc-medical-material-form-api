import { gql } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';

const scalarTimeStamp = new GraphQLScalarType({
  name: 'TimeStamp',
  description: 'TimeStamp custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});

const typeDefs = gql`

  scalar TimeStamp

  type Token {
    token: String!
  }

  type Data {
    remark: String
  }
`;

const resolvers = {
  TimeStamp: scalarTimeStamp,
};

module.exports = {
  typeDefs,
  resolvers,
};
