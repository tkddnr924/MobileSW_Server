const router = require("express-promise-router")()
const controller = require('./controller')

router.post('/join', controller.userJoin)
router.post('/login', controller.userLogin)
router.post('/status', controller.userStatus)
router.post('/logout', controller.userLogOut)

module.exports = router
