import winston from 'winston';

// const options = {
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false,
//     colorize: true,
//   },
// };

// const logger: winston.Logger = winston.createLogger({
//   transports: [
//       new winston.transports.Console(options.console)
//   ],
//   exitOnError: false, // do not exit on handled exceptions
// });

export enum Level {
  Debug = 'debug',
  Verbose = 'verbose',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

const colors = {
  debug: 'white',
  verbose: 'white',
  info: 'green',
  warn: 'yellow',
  error: 'red',
};

const transports = [
  new winston.transports.Console(),
  // new winston.transports.File({
  //   filename: 'logs/error.log',
  //   level: Level.Error,
  // }),
  // new winston.transports.File({ filename: 'logs/all.log' }),
];

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

class Logger {
  private logger!: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: Level.Info,
      transports: transports,
      format: format,
    });
    winston.addColors(colors);
  }

  public setLevel(level: Level): void {
    this.logger.level = level;
  }

  public debug(message: string, callback?: any) {
    this.logger.debug(message, callback);
  }

  public verbose(message: string, callback?: any) {
    this.logger.verbose(message, callback);
  }

  public info(message: string, callback?: any) {
    this.logger.info(message, callback);
  }

  public warn(message: string, callback?: any) {
    this.logger.warn(message, callback);
  }

  public error(message: string, callback?: any) {
    this.logger.error(message, callback);
  }
}

// export default Logger;
export const logger = new Logger();
