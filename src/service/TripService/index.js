const helper = require('./Helper')
const db = require('mongoose')

class TripService {
  constructor() {
    this.dbh = new helper()
  }

  async create_trip (userID, startDate, endDate, person) {
    const result = await this.dbh.add_trip(userID, startDate, endDate, person)

    if (!result.status) return { status: false, message: result.message }

    return result
  }

  async remind_trip (userID) {
    const result = await this.dbh.getTripByUserID(userID)
    if (!result.status) return { status: false, message: result.message}

    const tripSize = await this.dbh.getTripCountByUserID(userID)
    if (tripSize.count.length !== 0) {
      result.data.count = tripSize.count[0].trips
    } else {
      result.data.count = 0
    }

    return result
  }

  async add_destination (id, name, time, day, lat, lng) {
    const tripID = db.Types.ObjectId(id)
    const result = await this.dbh.addDestination(tripID, name, time, day, lat, lng)

    if (!result.status) return { status: false, message: result.message }

    return result
  }

  async get_destination (id) {
    const tripID = db.Types.ObjectId(id)
    const result = await this.dbh.getDestination(tripID)

    if (!result.status) return { status: false, message: result.message }

    return result
  }
}


module.exports = TripService
