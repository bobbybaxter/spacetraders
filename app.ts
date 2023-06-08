import cookieParser from 'cookie-parser';
import securityMiddleware from 'core/middleware/securityMiddleware.js';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import apiRouter from 'routes/index.js';
import { fileURLToPath } from 'url';

interface ErrorWithStatus extends Error {
  status: number;
}

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const customFormat =
  ':date[iso] :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger(customFormat));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(securityMiddleware);
app.use('/admin', express.static(path.join(__dirname, 'admin/build'))); // Serve static assets from the React app
app.use('/api', apiRouter);
app.use((req, res, next) => next(createError(404))); // catch 404 and forward to error handler

// error handler
app.use(
  (
    err: ErrorWithStatus,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
);

// Catch-all handler to serve index.html for all other requests
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin/build', 'index.html'));
});

process.on('unhandledRejection', (error: NodeJS.ErrnoException, promise) => {
  console.error('Unhandled promise rejection:', error);
  console.error('Promise:', promise);
  console.error('Stack trace:', error.stack);
});

export default app;
