import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger';
import BusinessException from '../../exceptions/businessException';

export default (controllerFn: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controllerFn(req, res, next);
  } catch (error: any) {
    logger.error({
      message: error.message,
    });

    if (error instanceof BusinessException) {
      return res.status(error.getCode()).json({
        message: error.message,
      });
    }

    return res.status(error.status || 500).json(error);
  }
};
