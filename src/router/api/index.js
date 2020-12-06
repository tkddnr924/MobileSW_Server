const router = require("express-promise-router")();
const AuthService = require("../../service/AuthService")
const actions = require("../../service/androidAction");

router.post('/join', async (req, res, next) => {
  const { email, password, username, age, sex } = req.body
  const service = new AuthService()

  const result = await service.create_user(email, password, username, age, sex)
  if (!result.status) return res.json({ success: false, message: result.message, action: actions.AUTH_ERROR })

  return res.json({ success: true, message: result.message, data: {}, action: actions.JOIN })
})

router.post('/login', async (req, res, next) => {
  const { token } = req.body
  console.log("[TOKEN] " + token)
  const service = new AuthService()

  const exp = 60 * 60 * 24 * 5 * 1000
  const result = await service.sign_in(token, exp)

  if (!result.status) return res.json({ success: false, message: result.message, action: actions.AUTH_ERROR })

  const options = { maxAge: exp, httpOnly: true, secure: true};
  res.cookie('JTA_LOGIN_TOKEN', result.data.token, options)

  return res.json({ success: true, message: result.message, data: result.data, action: actions.LOGIN })
})

router.post('/status', async (req, res, next) => {
  const { token } = req.body
  const service = new AuthService()

  const exp = 60 * 60 * 24 * 5 * 1000
  const result = await service.sign_check(token, exp)

  if (!result.status) return res.json({ success: false, message: result.message, action: actions.AUTH_ERROR })

  const options = { maxAge: exp, httpOnly: true, secure: true};
  res.cookie('JTA_LOGIN_TOKEN', result.data.token, options)

  return res.json({ success: true, message: result.message, data: result.data, action: actions.STATUS })
})

router.post('/logout', async (req, res, next) => {
  res.clearCookie('JTA_LOGIN_TOKEN');
  return res.json({ success: true, message: '로그아웃!', action: actions.LOGOUT, data: {} })
})

const trip = require('./trip')
router.use('/trip', trip)

module.exports = router
