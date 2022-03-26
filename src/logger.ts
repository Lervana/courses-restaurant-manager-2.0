import winston, { createLogger, Logger } from 'winston'
import 'winston-daily-rotate-file'

import { TLogLevel } from 'src/types/config.types'
import config from 'src/config'

const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/REST_DEMO%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error',
})

const alignColorsAndTime = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.label({ label: 'REST_DEMO' }),
    winston.format.timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    winston.format.printf(
        (info) =>
            ` ${`[${info.label}]`} ${info.timestamp} ${info.level}: ${
                info.message
            }`,
    ),
)

export default function getLogger(
    logLevel: TLogLevel,
    silentLogs: boolean,
): Logger {
    return createLogger({
        level: logLevel,
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    alignColorsAndTime,
                ),
            }),
            transport,
        ],
        silent: silentLogs,
    })
}

export const logger = getLogger(
    config.options.logLevel,
    config.options.silentLogs,
)
