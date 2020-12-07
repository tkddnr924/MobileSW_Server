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

  async getTripByUserID (userID) {
    return tripModel.findTripByUserID(userID).then((trip) => {
      return { status: true, message: "여행 불러오기 완료", data: { trip: trip } }
    }).catch(error => {
      return { status: false, message: error.message }
    })
  }

  async getTripCountByUserID (userID) {
    return tripModel.countTripByUserID(userID).then((count) => {
      return { count: count }
    }).catch(error => {
      return { count: 0 }
    })
  }
}

module.exports = Helper
