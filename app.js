const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./cfg')
const path = require('path')
const cors = require('cors')
const winston = require('./src/utils/winston')
const jwt = require('./src/utils/jwt')

const init = server => {
  server.use(cors(
    {
      origin: ['http://localhost','http://localhost:8080','http://localhost:8000'],
      methods:['POST','GET','PUT','DELETE','PATCH'],
      credentials: true,
      allowedHeaders:['Origin','X-Requested-With','Content-Type','Accept','Authorization'],
      withCredentials:true
    }
  ))

  server.use(bodyParser.json()) // support json encoded bodies
  server.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
  server.use(cookieParser())

  server.use(async (req, res, next) => {
    const tokenChk = await jwt.check_firebase_token(req.cookies.JTA_LOGIN_TOKEN)
    if (tokenChk.success) {
      req.user_info = tokenChk.data.tokenData
      req.is_login = tokenChk.data.login
    }
    next()
  })

  const mainRouter = require('./src/router')
  server.use('/', mainRouter)

  server.use((req,res,next)=>[
    res.status(404).json({message:"PageNotFound"}).end()
  ])

  server.use((err, req, res, next) => {
    const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
    winston.error(String(ip)+' - ' + String(err))
    res
      .status(500)
      .json({
        message:
          "예상치 못한 오류가 발생했습니다",
      })
      .end()

    next(err)
  })
  return server;
}

const server = express();
const app = init(server);

const admin = require('firebase-admin');
const serviceAccount = require("./jejutripadvisor-firebase-adminsdk-rve96-3abc9fad71.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jejutripadvisor.firebaseio.com"
});

// mongo db
const { connect, initSchemas } = require('./src/models');

(async () => {
  await connect()
  initSchemas()
})();

server.listen(config.port,'0.0.0.0', () => {
  winston.info(`> Ready on http://localhost:${config.port}`)
})

module.exports = app;
