const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dayjs = require('dayjs')

const tripSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: Math.floor(new Date().valueOf() * Math.random())
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true
  },
  person: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
})

module.exports = mongoose.model('Trip', tripSchema)
