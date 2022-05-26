module.exports = {
  type: 'postgres',
  host: process.env.HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
