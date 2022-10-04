module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'aluguel',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },

};
