const Egg = require('./egg')
const app = new Egg()
app.start(3000)
app.on('error', err => {
  console.log('发生错误 ', err)
})