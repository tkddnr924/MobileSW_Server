const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dayjs = require('dayjs')

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
