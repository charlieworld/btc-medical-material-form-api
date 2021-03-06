import knexFile from '../knexfile';

knexFile.pool = {
  min: 0,
  max: 7,
};

const knex = require('knex')(knexFile);

const single = async (table = null, where = {}) => {
  if (!table) return false;
  const res = await knex
    .where(where)
    .select()
    .from(table)
    .limit(1);
  return (res.length > 0) ? res[0] : null;
};

const select = async (table = null, where = {}, limit = 20, offset = 0) => {
  if (!table) return false;
  const res = await knex
    .where(where)
    .select()
    .from(table)
    .limit(limit)
    .offset(offset);
  if (res.length <= 0) return null;
  return res;
};

const insert = async (table = null, data) => {
  if (!table) return false;
  const res = await knex(table)
    .insert(data)
    .returning('id');
  return res[0];
};

const update = async (table = null, where = null, data) => {
  if (!table || !where) return false;
  const res = await knex(table)
    .where(where)
    .update(data)
    .returning('id');
  return res[0];
};

const del = async (table = null, where = null) => {
  if (!table || !where) return false;
  const res = await knex(table)
    .where(where)
    .del();
  return res;
};

module.exports = {
  single,
  select,
  insert,
  update,
  del,
};
