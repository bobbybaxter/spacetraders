// import { LoggingWinston } from '@google-cloud/logging-winston';
import { MESSAGE } from 'triple-beam';
import winston from 'winston';
import pgTransport from './pgTransport.js';

const { createLogger, format, transports, addColors } = winston;
const { combine, timestamp, printf } = format;
const myFormat = printf((info) => {
  const { level, message, label, timestamp } = info;

  return `${timestamp.slice(0, 19)} [${label}] ${level}: ${message} -- ${info[MESSAGE]}`;
});

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
    report: 7,
  },
  colors: {
    info: 'blue',
    warn: 'italic yellow',
    error: 'bold red',
    debug: 'green',
    report: 'magenta',
  },
};

addColors(customLevels.colors);

const options = {
  console: {
    level: 'report',
    handleExceptions: true,
    json: false,
    colorize: true,
    // timestamp: true,
    format: combine(
      format.colorize({
        all: true,
      }),
      timestamp(),
      myFormat
    ),
  },
  pgTransport: {
    level: 'report',
    handleExceptions: true,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
export const log = createLogger({
  levels: customLevels.levels,
  transports: [new transports.Console(options.console), new pgTransport(options.pgTransport)],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
// log.stream = {
//   write(message: any) {
//     // use the 'info' log level so the output will be picked up by both transports (file and console)
//     log.info(message);
//   },
// };
