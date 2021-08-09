module.exports = {
  db: {
    dialect: 'mysql',
    host: 'localhost',
    database: 'test',
    username: 'root',
    password: '123456'
  },
  middleware: ['errorHandler', 'logger']  // 以数组形式，保证执行顺序
}
