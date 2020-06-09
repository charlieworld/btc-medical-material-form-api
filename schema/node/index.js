/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';

const node = fs
  .readdirSync(__dirname)
  .filter((name) => /Node\.js$/.test(name))
  .map((name) => require(path.join(__dirname, name)));

module.exports = {
  typeDefs: node.map((name) => name.typeDefs),
  resolvers: node.map((name) => name.resolvers),
};
