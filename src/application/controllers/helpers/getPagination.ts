import { Request } from 'express';

const getPagination = (req: Request): {
  skip: number;
  limit: number;
} => {
  const skip = parseInt(req.query.skip as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  return {
    skip, limit,
  };
};

export default getPagination;
