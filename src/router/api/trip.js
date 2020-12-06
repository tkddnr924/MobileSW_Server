const router = require("express-promise-router")();
const UserModel = require("../../models/user")
const TripService = require("../../service/TripService")
const actions = require("../../service/androidAction")

router.post('/add', async (req, res, next) => {
  const { startDate, endDate, person } = req.body
  const userEmail = req.user_info.email
  const user = await UserModel.findOne({email: userEmail}).exec()
  const service = new TripService()

  const result = await service.create_trip(user._id, startDate, endDate, person)

  if (!result.status) return res.json({ success: false, message: result.message, action: actions.TRIP_ERROR })

  return res.json({ success: true, message: result.message, action: actions.ADD_TRIP })
})

module.exports = router
