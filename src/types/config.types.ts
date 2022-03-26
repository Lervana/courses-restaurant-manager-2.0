import { CorsOptions } from 'cors'

export type TEnv = 'production' | 'test' | 'development'

export type TLogLevel =
    | 'error'
    | 'warn'
    | 'info'
    | 'http'
    | 'verbose'
    | 'debug'
    | 'silly'

export type TConfig = {
    env: TEnv
    isDev: boolean
    isTest: boolean
    name: string
    options: {
        port: number
        logLevel: TLogLevel
        silentLogs: boolean
        cors: CorsOptions
    }
}
