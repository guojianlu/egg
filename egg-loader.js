const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

// 加载dir目录下的所有文件
function load(dir, cb) {
  const url = path.resolve(__dirname, dir)
  const files = fs.readdirSync(url)
  files.forEach(filename => {
    filename = filename.replace('.js', '')
    const file = require(`${url}/${filename}`)
    cb(filename, file)
  })
}

// 路由加载
function initRouter(app) {
  const router = new Router()
  load('routes', (filename, routes) => {
    const prefix = filename === 'index' ? '' : `/${filename}`
    routes = typeof routes === 'function' ? routes(app) : routes
    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(' ')
      router[method](`${prefix}${path}`, async ctx => {
        app.ctx = ctx
        await routes[key](app)
      })
    })
  })
  return router
}

// 控制器加载
function initController(app) {
  const controllers = {}

  load('controller', (filename, controller) => {
    controller = typeof controller === 'function' ? controller(app) : controller
    controllers[filename] = controller
  })

  return controllers
}

// 加载Service
function initService(app) {
  const services = {}

  load('service', (filename, service) => {
    services[filename] = service(app)
  })

  return services
}

// 加载conf
const Sequelize = require('sequelize')
function loadConfig(app) {
  load('config', (filename, conf) => {
    if (conf['db']) {
      // app.$db = new Sequelize(conf['db'])

      // 加载模型
      // app.$model = {};
      // load('model', (filename, { schema, options }) => {
      //   app.$model[filename] = app.$db.define(filename, schema, options)
      // })
      // app.$db.sync()
    }
    
    // 如果有middleware选项，则按其规定循序应用中间件 
    if (conf['middleware']) {
      conf['middleware'].forEach(mid => {
        const midPath = path.resolve(__dirname, 'middleware', mid);
        app.$app.use(require(midPath));
      })
    }
  })
}

// 加载定时任务
const schedule = require('node-schedule')
function loadSchedule() {
  load('schedule', (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
  })
}

module.exports = { initRouter, initController, initService, loadConfig, loadSchedule }
