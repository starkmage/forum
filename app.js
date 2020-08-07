const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const router = require('./router')

const app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname,'./node_modules/')))

//配置art-template
app.engine('html', require('express-art-template'))
//配置解析表单post插件
app.use(bodyParser.urlencoded({extended: false}))
//配置express-session插件
app.use(session({
  secret: 'keyboard cat', //在原有基础上拼接这个字符串进行加密，增加安全性
  resave: false,
  saveUninitialized: true
}))

//挂载路由
app.use(router)


//配置一个处理404的中间件
app.use((req, res) => {
  res.render('404.html')
})

//配置一个全局错误处理中间件，参数一个也不能少！！！
app.use((err, req, res, next) => {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})


app.listen(8000, () => {
  console.log('running......');
})