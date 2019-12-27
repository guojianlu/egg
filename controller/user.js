module.exports = {
  test: async app => {
    app.ctx.body = '用户Test'
  },
  index: async app => {
    app.ctx.body = await app.$model.user.findAll()
  },
}
