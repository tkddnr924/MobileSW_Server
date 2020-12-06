const tripModel = require("../../models/Trip")

class Helper {
  constructor () {}

  async add_trip (userID, startDate, endDate, person) {
    const trip = new tripModel({
      userid: userID,
      startDate: startDate,
      endDate: endDate,
      person: person
    })

    return trip.save().then(() => {
      return { status: true, message: "여행 저장 성공" }
    }).catch(error => {
      return { status: false, message: error.message }
    })
  }
}

module.exports = Helper
