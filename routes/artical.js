module.exports = {
  'get /': async app => {
    const { ctx } = app
    const data = {
      title: '文章',
      time: ctx.helper.formatTime(new Date())
    }
    ctx.helper.success({ ctx, res: data })
  }
}
