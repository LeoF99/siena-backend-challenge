import { Request, Response, NextFunction } from 'express';
import logger from '../helpers/logger';

const RequestLoggerHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`${req.method} request on ${req.url}`, {
    data: {
      remoteIp: req.ip,
      contentLength: req.headers['content-length'],
      userAgent: req.headers['user-agent'],
    },
  });

  next();
};

export default RequestLoggerHandler;
