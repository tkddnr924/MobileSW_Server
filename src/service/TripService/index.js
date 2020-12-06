const helper = require('./Helper')


class TripService {
  constructor() {
    this.dbh = new helper()
  }

  async create_trip (userID, startDate, endDate, person) {
    const result = await this.dbh.add_trip(userID, startDate, endDate, person)

    if (result.status) return result

    return { status: false, message: result.message }
  }
}


module.exports = TripService
