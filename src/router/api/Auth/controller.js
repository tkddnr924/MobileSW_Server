const AuthService = require("../../../service/AuthService")
const actions = require("../../../service/androidAction");

const exp = 60 * 60 * 24 * 5 * 1000

exports.userJoin = async (req, res, next) => {
  const { email, password, username, age, sex } = req.body
  const service = new AuthService()
  const result = await service.create_user(email, password, username, age, sex)

  if (!result.status) return res.json({ success: false, message: result.message, action: actions.AUTH_ERROR })

  return res.json({ success: true, message: result.message, data: {}, action: actions.JOIN })
}

exports.userLogin = async (req, res, next) => {
  const { token } = req.body
  const service = new AuthService()
  const result = await service.sign_in(token, exp)

  if (!result.status) return res.json({ success: false, message: result.message, action: actions.AUTH_ERROR })

  const options = { maxAge: exp, httpOnly: true, secure: true};
  res.cookie('JTA_LOGIN_TOKEN', result.data.token, options)

  return res.json({ success: true, message: result.message, data: result.data, action: actions.LOGIN })
}

exports.userStatus = async (req, res, next) => {
  const { token } = req.body
  const service = new AuthService()
  const result = await service.sign_check(token, exp)

  if (!result.status) return res.json({ success: false, message: result.message, action: actions.AUTH_ERROR })

  const options = { maxAge: exp, httpOnly: true, secure: true};
  res.cookie('JTA_LOGIN_TOKEN', result.data.token, options)

  return res.json({ success: true, message: result.message, data: result.data, action: actions.STATUS })
}

exports.userLogOut = async (req, res, next) => {
  res.clearCookie('JTA_LOGIN_TOKEN');
  return res.json({ success: true, message: '로그아웃!', action: actions.LOGOUT, data: {} })
}
