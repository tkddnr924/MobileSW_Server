const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dayjs = require('dayjs')

const destinationSchema = new Schema({
  tripID: {
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  },
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
})

destinationSchema.statics.getDestinationByTripID = async function(tripID) {
  return this.aggregate([
    { $match: { tripID: tripID }}
  ]).exec()
}

module.exports = mongoose.model('Destination', destinationSchema)
