/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';

const mutation = fs
  .readdirSync(__dirname)
  .filter((name) => /Mutation\.js$/.test(name))
  .map((name) => require(path.join(__dirname, name)));

module.exports = {
  typeDefs: mutation.map((name) => name.typeDefs),
  resolvers: mutation.map((name) => name.resolvers),
};
