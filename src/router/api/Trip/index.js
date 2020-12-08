const router = require("express-promise-router")();
const controller = require('./controller')
const middleware = require('./middlewares')

router.post('/add', middleware.isLoggIn, controller.addTrip)
router.get('/remind', middleware.isLoggIn, controller.remindTrip)
router.post('/add/destination', middleware.isLoggIn, controller.add_destination)
router.get('/destination/:tripID', middleware.isLoggIn, controller.getAllDestination)

module.exports = router
