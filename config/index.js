module.exports = {
  db: {
    dialect:'mysql',
    host:'localhost',
    database:'kaikeba',
    username:'root',
    password:'example'
  },
  middleware: ['errorHandler', 'logger']  // 以数组形式，保证执行顺序
}
