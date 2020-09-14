import { Request, Response, NextFunction } from 'express';
import _isUndefined from 'lodash/isUndefined';

const DEFAULT_ITEMS_PER_PAGE = 50;
const ITEMS_PER_PAGE_LIMIT = 100;
const DEFAULT_PAGE = 0;

const paginationMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  if (_isUndefined(req.query.limit)) req.query.limit = DEFAULT_ITEMS_PER_PAGE;
  else if (req.query.limit > ITEMS_PER_PAGE_LIMIT) req.query.limit = ITEMS_PER_PAGE_LIMIT;
  else req.query.limit = Number(req.query.limit);

  if (_isUndefined(req.query.page)) req.query.page = DEFAULT_PAGE;
  else req.query.page = Number(req.query.page);

  req.query.skip = req.query.limit * req.query.page;

  next();
};

export default paginationMiddleware;
