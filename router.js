const express = require('express')
const User = require('./models/user')
const md5 = require('blueimp-md5')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register.html')
})

/* router.post('/register', (req, res) => {
  //1.获取表单数据req.body
  //2.操作数据库
  //2.1判断用户是否存在
  const newUser = req.body
  User.findOne({
    $or: [
      { email: newUser.email },
      { nickname: newUser.nickname }
    ]
  }).then(
    data => {
      //邮箱或者昵称已经存在
      if (data) {
        //express提供了一个响应方法，该方法接受一个对象作为参数，它会自动帮你把对象转为JSON字符串发送给浏览器
        return res.status(200).json({
          err_code: 1,
          message: 'Sorry, email or nickname has been used'
        })
      }
      //利用md5第三方包，对密码双层加密
      newUser.password = md5(md5(newUser.password))
      new User(newUser).save().then(
        data => res.status(200).json({
          err_code: 0,
          message: 'ok'
        }),
        err => res.status(500).json({
          err_code: 500,
          message: 'Server error'
        })
      )
    },
    err => res.status(500).json({
      err_code: 500,
      message: 'Server error'
    })
  )
}) */

//优雅的写法
router.post('/register', async (req, res) => {
  const newUser = req.body
  try {
    if (await User.findOne({ email: newUser.email })) {
      return res.status(200).json({
        err_code: 1,
        message: 'Sorry, email has been used'
      })
    }
    if (await User.findOne({ nickname: newUser.nickname })) {
      return res.status(200).json({
        err_code: 2,
        message: 'Sorry, nickname has been used'
      })
    }

    newUser.password = md5(md5(newUser.password))

    await new User(newUser).save()

    return res.status(200).json({
      err_code: 0,
      message: 'ok'
    })
  } catch (err) {
    return res.status(500).json({
      err_code: 500,
      message: 'Server error'
    })
  }
})





module.exports = router