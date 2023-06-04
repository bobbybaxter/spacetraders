import { NextFunction, Request, Response } from 'express';
import { log } from 'helpers/index.js';
import createError from 'http-errors';
import ApiResponseHandler from 'routes/apiResponseHandler.js';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url)
  .split(/[\\/]/)
  .pop();

const nonSecurePaths = [
  '/',
  // '/api/nameOfPath',
];

export default (req: Request, res: Response, next: NextFunction) => {
  const {
    ip,
    path,
    headers,
    socket: { remoteAddress },
  } = req;

  if (path.startsWith('/admin')) {
    // Serve static files in the public folder without processing them through the middleware
    return next();
  }

  if (nonSecurePaths.includes(path)) return next();

  const key = process.env.AUTH_KEY;
  const auth = headers?.['x-auth'];

  if (auth === key) return next();

  log.error({
    label: `security breach attempt - file: ${fileName}`,
    message: 'security breach attempt',
    data: { ip, path, remoteAddress, headers },
  });

  return ApiResponseHandler.error(req, res, createError(401, 'Not Authorized'));
};
