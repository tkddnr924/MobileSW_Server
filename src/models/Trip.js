const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dayjs = require('dayjs')

const tripSchema = new Schema({
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

tripSchema.statics.findTripByUserID = async function (userID) {
  return this.find({ userid: userID }).exec()
}

tripSchema.statics.countTripByUserID = async function (userID) {
  return this.aggregate([
    { $match: { userid: userID } },
    { $count: 'trips' }
  ]).exec()
}

module.exports = mongoose.model('Trip', tripSchema)
