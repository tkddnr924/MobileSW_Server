const router = require("express-promise-router")();
const controller = require('./controller')
const middleware = require('./middlewares')

router.post('/add', middleware.isLoggIn, controller.addTrip)
router.get('/remind', middleware.isLoggIn, controller.remindTrip)

module.exports = router
