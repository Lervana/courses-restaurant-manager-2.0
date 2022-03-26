import _ from 'lodash'

import { TConfig, TEnv } from 'src/types/config.types'

const noEnvFile = process.env.NO_ENVFILE
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (_.isNil(noEnvFile)) require('dotenv').config()

const env = (process.env.NODE_ENV || 'production') as TEnv
const isDev = env === 'development'
const isTest = env === 'test'
const port = Number(process.env.APP_PORT) || 3000

const config: TConfig = {
    env,
    isDev,
    isTest,
    name: 'Example app',
    options: {
        port,
        logLevel: isDev ? 'silly' : 'http',
        silentLogs: isTest,
        cors: isDev ? { origin: 'localhost:' + port } : {},
    },
}

export default config
