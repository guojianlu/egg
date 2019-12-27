const Koa = require('koa')
const { initRouter, initController, initService, loadConfig, loadSchedule } = require('./egg-loader')

class Egg {
  constructor(conf) {
    this.$app = new Koa(conf)

    loadConfig(this)

    this.$service = initService(this)

    this.$ctrl = initController(this)

    this.$router = initRouter(this)

    this.$app.use(this.$router.routes())

    loadSchedule()
  }

  start(port) {
    this.$app.listen(port, () => {
      console.log(`server is running at ${port}`)
    })
  }
}

module.exports = Egg