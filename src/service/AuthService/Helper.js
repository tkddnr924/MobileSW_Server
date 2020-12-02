const admin = require('firebase-admin')
const userModel = require('../../models/user')
const dayjs = require('dayjs')

class Helper {
  constructor () {}

  async insert_user (email, password, username, age, sex) {
    return admin.auth().createUser({
      email: email,
      password: password
    }).then(userRecord => {
      const createTime = dayjs(userRecord.metadata.creationTime).format('YYYY-MM-DD HH:mm:ss')
      // mongo db 유저 저장
      const user = new userModel({ email: email, userName: username, age: age, sex: sex, createdAt: createTime })
      user.save()

      return {status: true, message: "회원가입 성공" }
    }).catch(error => {
      return {status: false, message: error.message}
    })
  }

  async login (idToken, exp) {
    return admin.auth().createSessionCookie(idToken, { expiresIn: exp })
      .then(sessionCookie => {
        return { status: true, message: '로그인 성공', token: sessionCookie }
      }).catch(error => {
        return { status: false, message: error.message }
      })
  }

  async check_status (idToken, exp) {
    return admin.auth().verifyIdToken(idToken)
      .then(decodedIdToken => {
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
          // Create session cookie and set it.
          const sessionCookie = admin.auth().createSessionCookie(idToken, {expiresIn: exp});
          return { status: true, message: '로그인 성공', token: sessionCookie }
        }
        // A user that was not recently signed in is trying to set a session cookie.
        // To guard against ID token theft, require re-authentication.
        return { status: false, message: '재 로그인 필요'}
      })
  }
}

module.exports = Helper
