import { Request, Response } from 'express';
import { HttpError } from 'http-errors';

class ApiResponseHandler {
  static async download(req: Request, res: Response, path: string) {
    res.download(path);
  }
  static async success(req: Request, res: Response, payload: Record<string, any>) {
    if (payload !== undefined) {
      res.status(200).send(payload);
    } else {
      res.sendStatus(200);
    }
  }
  static async error(req: Request, res: Response, error: HttpError) {
    if (error && [400, 401, 403, 404].includes(error.code)) {
      res.status(error.code).send(error.message);
    } else {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
}
export default ApiResponseHandler;
