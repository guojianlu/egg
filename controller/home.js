module.exports = app => ({
  index: async app => {
    app.ctx.body = '首页CTRL'
  },
  detail: async app => {
    app.ctx.body = '详情页CTRL'
  }
})
