const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dayjs = require('dayjs')

/*
* @id: id 값
* @email: 로그인 아이디 (중복 x)
* @userName: 유저 이름
* @nickName: 유저 별명 (이걸로 URL 작업)
* @password
* @createdAt
* @provider: 어떤식으로 가입했는지 ('local': instaStudy, 'google': 구글 로그인)
* */
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: Math.floor(new Date().valueOf() * Math.random())
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true,
    default: dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
})

module.exports = mongoose.model('User', userSchema)
