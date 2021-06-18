// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'N1ghtf0x',
      database: 'stockup',
      charset: 'utf8'
    }
  },
  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL
  }
};