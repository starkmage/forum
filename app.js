const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname,'./node_modules/')))

//配置art-template
app.engine('html', require('express-art-template'))
//配置解析表单post插件
app.use(bodyParser.urlencoded({extended: false}))

//挂载路由
app.use(router)



app.listen(8000, () => {
  console.log('running......');
})