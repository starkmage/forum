const mongoose = require('mongoose')
const Schema = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://localhost:27017/forum', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    //注意，这里如果写了Date.now()会立刻调用
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    //限制
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    //0——账户正常，1——限制评论，2——禁止登陆
    enum: [0, 1, 1],
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)