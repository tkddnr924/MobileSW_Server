const helper = require('./Helper')
const req_mail = /^\S*\@[a-zA-Z]*(\.[a-zA-Z]{2,})+$/
const req_pw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/

class AuthService {
  constructor() {
    this.dbh = new helper()
  }

  async create_user (email, password, username, age, sex) {

    if (!req_mail.test(email)) { return { status: false, message: "E-Mail을 확인해주세요"} }
    if (!req_pw.test(password)) { return { status: false, message: "Password를 확인해주세요"}}

    const result = await this.dbh.insert_user(email, password, username, age, sex)

    if (result.status) return result

    return { status: false, message: result.message }
  }

  async sign_in (idToken, exp) {
    const result = await this.dbh.login(idToken, exp)

    if (result.status) {
      return { status: true, message: result.message, data: { token: result.token }}
    }

    return { status: false, message: result.message }
  }

  async sign_check (idToken, exp) {
    const result = await this.dbh.check_status(idToken, exp)

    if (result.status) {
      return { status: true, message: result.message, data: { token: result.token }}
    }
    return { status: false, message: result.message }
  }

}

module.exports = AuthService
