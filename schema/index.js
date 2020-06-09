import node from './node';
import query from './query';
import mutation from './mutation';

module.exports = {
  typeDefs: [...node.typeDefs, ...query.typeDefs, ...mutation.typeDefs],
  resolvers: [...node.resolvers, ...query.resolvers, ...mutation.resolvers],
};
