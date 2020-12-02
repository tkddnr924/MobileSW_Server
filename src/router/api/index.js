const router = require("express-promise-router")();
const AuthService = require("../../service/AuthService")

router.post('/join', async (req, res, next) => {
  const { email, password, username, age, sex } = req.body
  const service = new AuthService()

  const result = await service.create_user(email, password, username, age, sex)
  if (!result.status) return res.json({ success: false, message: result.message })

  return res.json({ success: true, message: result.message })
})

router.post('/login', async (req, res, next) => {
  const { token } = req.body
  const service = new AuthService()

  const exp = 60 * 60 * 24 * 5 * 1000
  const result = await service.sign_in(token, exp)

  if (!result.status) return res.json({ success: false, message: result.message })

  const options = { maxAge: expiresIn, httpOnly: true, secure: true};
  res.cookie('JTA_LOGIN_TOKEN', result.data.token, options)

  return res.json({ success: true, message: result.message, data: result.data })
})

router.post('/status', async (req, res, next) => {
  const { token } = req.body
  const service = new AuthService()

  const exp = 60 * 60 * 24 * 5 * 1000

  const result = await service.sign_check(token, exp)

  if (!result.status) return res.json({ success: false, message: result.message })

  const options = { maxAge: expiresIn, httpOnly: true, secure: true};
  res.cookie('JTA_LOGIN_TOKEN', result.data.token, options)

  return res.json({ success: true, message: result.message, data: result.data })
})

router.post('/logout', async (req, res, next) => {
  res.clearCookie('JTA_LOGIN_TOKEN');
  return res.json({ success: true, message: '로그아웃!'})
})

module.exports = router
