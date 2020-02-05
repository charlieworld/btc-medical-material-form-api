module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    port: 54321,
    host: '127.0.0.1',
    user: 'root',
    password: 'test',
    database: 'btc_mmform',
  },
}
