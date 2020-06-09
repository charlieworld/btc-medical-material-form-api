/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';

const query = fs
  .readdirSync(__dirname)
  .filter((name) => /Query\.js$/.test(name))
  .map((name) => require(path.join(__dirname, name)));

module.exports = {
  typeDefs: query.map((name) => name.typeDefs),
  resolvers: query.map((name) => name.resolvers),
};
