const helper = require('./Helper')


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

    result.data.count = tripSize.count[0].trips

    return result
  }
}


module.exports = TripService
