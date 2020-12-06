const mongoose = require("mongoose")
const tripModel = require("../../models/Trip")

class Helper {
  constructor () {}

  async add_trip (user, startDate, endDate, night, createdAt) {
    const trip = new tripModel({
      userid: userID,
      startDate: startDate,
      endDate: endDate,
      night: night,
      createdAt: createdAt
    })
  }
}
