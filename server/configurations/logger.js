const { createLogger, format, transports } = require('winston');
const dailyRotateFile = require('winston-daily-rotate-file');

const formatLog = format.combine(
    format.timestamp({
        format: 'DD/MM/YYYY-HH:mm:ss'
    }),
    format.json()
);

const loggerConfig = {
  format: formatLog,
  transports: [
    new transports.Console(),
    new dailyRotateFile({
        filename: 'logs/application_%DATE%.log',
        datePattern: 'DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    })
  ]
};

try {
  const logger = createLogger(loggerConfig);
  module.exports = logger;
} catch (error) {
  console.error('Error custom logger configuration: ', error);
  process.exit(1);
}