const tripModel = require("../../models/Trip")
const desModel = require("../../models/Destination")

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

  async addDestination (tripID, name, time, day, lat, lng) {
    const destination = new desModel({
      tripID: tripID,
      name: name,
      time: time,
      day: day,
      latitude: lat,
      longitude: lng
    })

    return destination.save().then(() => {
      return { status: true, message: "여행지 저장 성공" }
    }).catch(error => {
      return { status: false, message: error.message }
    })
  }

  async getDestination (tripID) {
    return desModel.getDestinationByTripID(tripID).then((dest) => {
      return { status: true, message: "여행지 불러오기 완료", data: {destination: dest} }
    }).catch(error => {
      return { status: false, message: error.message }
    })
  }
}

module.exports = Helper
