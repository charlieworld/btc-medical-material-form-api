import '@babel/polyfill';
import { ApolloServer } from 'apollo-server-express';
import { mergeTypeDefs, mergeResolvers } from 'graphql-tools';
import express from 'express';
import { createServer } from 'http';
// import schema from './schema';
import model from './model';
import t from './tools/token';

import schema from './schema';

const { adminModel, authModel } = model;

require('dotenv').config();

const apollo = new ApolloServer(
  {
    typeDefs: mergeTypeDefs(schema.typeDefs),
    resolvers: mergeResolvers(schema.resolvers),
    context: async ({ req }) => {
      const { authorization } = req.headers;
      const context = {
        authModel,
        adminModel,
        me: null,
      };
      if (authorization) {
        try {
          const me = await t.verify(authorization);
          context.me = me;
        } catch (e) {
          throw new Error('Your session expired. Sign in again.');
        }
      }
      return context;
    },
  },
);

const app = express();
apollo.applyMiddleware({ app, path: '/graphql' });

const http = createServer(app);
apollo.installSubscriptionHandlers(http);

const PORT = process.env.GRAPHQL_PORT || 8101;

http.listen({ port: PORT }, () => {
  /* eslint-disable */
  console.log(`GraphQL ready at http://localhost:${PORT}${apollo.graphqlPath}`);
  /* eslint-disable */
  console.log(
    `Subscriptions ready at ws://localhost:${PORT}${apollo.subscriptionsPath}`
  );
});
