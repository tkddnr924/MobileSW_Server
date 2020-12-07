const router = require("express-promise-router")();
const auth = require('./Auth')
const trip = require('./Trip')

router.use('/auth', auth)
router.use('/trip', trip)

module.exports = router
