const admin = require('firebase-admin')

const check_firebase_token = async (sessionCookie) => {
  return admin.auth().verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
      return { success: true, message: "성공적으로 데이터를 불러옴", data: { login: true, tokenData: decodedClaims}}
    })
    .catch(error => {
      // Session cookie is unavailable or invalid. Force user to login.
      return { success: false, message: error.message, data: { login: false, relogin: true }}
    });
}

module.exports = {
  check_firebase_token: check_firebase_token
}
