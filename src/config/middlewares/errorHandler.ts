import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger';

export default (controllerFn: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controllerFn(req, res, next);
  } catch (error: any) {
    logger.error('Something went wrong', {
      message: error.message,
      stack: error.stack,
    });

    next(error);
  }
};
