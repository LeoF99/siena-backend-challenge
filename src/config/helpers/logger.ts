import winston from 'winston';

const { serviceName, version } = process.env;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
  ],
  defaultMeta: { service: serviceName, version },
});

export default logger;
