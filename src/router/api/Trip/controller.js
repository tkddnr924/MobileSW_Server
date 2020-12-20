const UserModel = require("../../../models/user")
const TripService = require("../../../service/TripService")
const actions = require("../../../service/androidAction")

exports.addTrip = async (req, res, next) => {
  const { startDate, endDate, person } = req.body
  const service = new TripService()
  const userID = await getUserID(req)
  const result = await service.create_trip(userID, startDate, endDate, person)

  if (!result.status) return res.json({ success: false, message: result.message, action: actions.TRIP_ERROR })

  return res.json({ success: true, message: result.message, action: actions.ADD_TRIP, data: result.data })
}

exports.remindTrip = async (req, res, next) => {
  const service = new TripService()
  const userID = await getUserID(req)
  const result = await service.remind_trip(userID)

  if (!result.status) return res.json({ success: false, message: result.message, action: actions.TRIP_ERROR })

  return res.json({ success: true, message: result.message, data: result.data, action: actions.REMIND_TRIP  })
}

exports.add_destination = async (req, res, next) => {
  const service = new TripService()
  const { tripID, name, time, day, lat, lng } = req.body
  const result = await service.add_destination(tripID, name, time, day, lat, lng)

  if (!result.status) return res.json({ success: false, message: result.message, action: actions.DEST_ERROR })

  return res.json({ success: true, message: result.message, data: {}, action: actions.ADD_DEST})
}

exports.getAllDestination = async (req, res, next) => {
  const service = new TripService()
  const tripID = req.params.tripID
  const result = await service.get_destination(tripID)

  if (!result.status) return res.json({ success: false, message: result.message, action: actions.DEST_ERROR })

  return res.json({ success: true, message: result.message, action: actions.GET_DEST, data: result.data })
}

const getUserID = async (req) => {
  const userEmail = req.user_info.email
  const user = await UserModel.findUser(userEmail)
  return user._id
}
