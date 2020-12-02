const appRoot = require('app-root-path');
const winston = require('winston');
const process = require('process');

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/dapp-service.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: false,
    format: combine(
      label({ label: 'dapp-service' }),
      timestamp(),
      myFormat
    )
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    format: combine(
      label({ label: 'nba_express' }),
      timestamp(),
      myFormat
    )
  }
}

let logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file)
  ],
  exitOnError: false,
});

if(process.env.NODE_ENV != 'prod'){
  logger.add(new winston.transports.Console(options.console))
}

module.exports = logger;
