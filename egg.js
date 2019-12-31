const Koa = require('koa')
const { initRouter, initController, initService, loadConfig, loadSchedule, loadExtend } = require('./egg-loader')
const EventEmitter = require('./events/EventEmitter')

class Egg extends EventEmitter {
  constructor(conf) {
    super()
    
    this.$app = new Koa(conf)

    loadExtend(this)

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