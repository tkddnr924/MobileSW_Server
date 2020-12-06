const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://admin:awZwkQbsaxVc8lqv@cluster0.lhhsp.mongodb.net'
const option = { dbName: 'JejuTrip', useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
const autoIncrement = require('mongoose-auto-increment')

module.exports.initSchemas = () => {
  require('./user')
  require('./Trip')
}

module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    let connectCounter = 0

    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    // MongoDB Connect
    mongoose.connect(mongoURI, option)
    autoIncrement.initialize(mongoose.connection)

    // Disconnect Event
    mongoose.connection.on('disconnected', () => {
      connectCounter++
      if (connectCounter < 5) {
        console.log('MongoDB disconnected, try to reconnect')
        mongoose.connect(mongoURI, option)
      } else {
        throw new Error('MongoDB broken(disconnected)')
      }
    })

    // Error Event
    mongoose.connection.on('error', () => {
      connectCounter++
      if (connectCounter < 5) {
        console.log('MongoDB error')
        mongoose.connect(mongoURI, option)
      } else {
        throw new Error('MongoDB broken(error)')
      }
    })

    // Connect Event
    mongoose.connection.once('open', () => {
      resolve()
      console.log('MongoDB connected!')
    })
  })
}
