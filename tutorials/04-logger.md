# 04 - Logger and config

Nice links:
- https://www.npmjs.com/package/tsc
- https://www.npmjs.com/package/tsconfig-paths
- https://www.npmjs.com/package/tsc-alias
- https://www.npmjs.com/package/cross-env
- https://www.npmjs.com/package/dotenv
- https://www.npmjs.com/package/lodash
- https://www.npmjs.com/package/winston
- https://www.npmjs.com/package/winston-daily-rotate-file

Creating own logger is very usefull for creating custom logging system. In this example simple custom logger will be 
created.

1. In project, we want to use short paths to files. In that case we need to add _tsconfig-paths_ into the dev script:
    ```shell 
    npm install tsc tsc-alias tsconfig-paths -D
    npm set-script dev "npx nodemon -r tsconfig-paths/register src/index.ts"
    npm set-script build "tsc-alias -p tsconfig.json"   
    ```
   
2. Its good practice to set NODE_ENV variable when running script for each env. Thanks to that, app knows on what env it 
is running. To provide this we can use _cross-env_ package:

    ```shell 
    npm install cross-env
    npm set-script dev "cross-env NODE_ENV=development npx nodemon -r tsconfig-paths/register src/index.ts"
    npm set-script build "tsc-alias -p tsconfig.json"   
    npm set-script start "cross-env NODE_ENV=production npx node build/index.js"   
    npm set-script test "cross-env NODE_ENV=test"   
    ```

3. Create files:
   - logger file: `touch src/logger.ts`
   - config file: `touch src/config.ts`
   - env file: `touch .env`
   

4. Inside _.env_ file define port on which app should run.
   ```text .env
   APP_PORT=5555
   ```


5. **Important**: _.env_ file should not be stored inside repository! It is only local file that will store  local 
and secret data. To prevent it from commiting add this file into _.gitignore_ file:
    ```text .gitignore
    /node_modules
    /build
    .env
   ```

6. Create config file, there all configuration should be stored. Remember to not store there any personal/secret data!
To store that kind of data you can use for example _.env_ file. Inside _config.ts_ file use _dotenv_ package to read 
values from .env file. Then assign port value to config param.
   ```shell
   npm install lodash dotenv
   npm install -D @types/lodash
   mkdir src/types
   touch src/types/config.types.ts
   ```
   
   ```js src/types/config.types.ts
   // src/types/config.types.ts
   
   export type TEnv = 'production' | 'test' | 'development'

   export type TConfig = {
      env: TEnv
      isDev: boolean
      isTest: boolean
      name: string
      options: {
         port: number
      }
   }
   ```

   ```js src/config.ts
   // src/config.ts - example structure
   
   import _ from 'lodash'
   
   import { TConfig, TEnv } from 'src/types/config.types'
   
   const noEnvFile = process.env.NO_ENVFILE
   if (_.isNil(noEnvFile)) require('dotenv').config()
   
   const env = (process.env.NODE_ENV || 'production') as TEnv
   const isDev = env === 'development'
   const isTest = env === 'test'
   
   const config: TConfig = {
      env,
      isDev,
      isTest,
      name: 'Example app',
      options: {
         port: Number(process.env.APP_PORT) || 3000,
      },
   }

   export default config
   ```

7. Create own logger. This util will help to have consistent logs inside app.

    ```shell
    touch src/logger.ts
    npm install winston winston-daily-rotate-file
    ```

    ```js src/logger.ts
    // src/logger.ts
    // Example logger - please create logger that meets your requirements
    // In this example winston and winston-daily-rotate-file packages will be used
    // To add them run npm install winston winston-daily-rotate-file 

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

    export default function getLogger(logLevel: TLogLevel, silentLogs: boolean): Logger {
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

    export const logger = getLogger(config.options.logLevel, config.options.silentLogs)
    ```
   
   ```js src/types/config.types.ts
   // src/types/config.types.ts
   
   export type TEnv = 'production' | 'test' | 'development'
   export type TLogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'

   export type TConfig = {
      env: TEnv
      isDev: boolean
      isTest: boolean
      name: string
      options: {
         port: number
         logLevel: TLogLevel
         silentLogs: boolean
      }
   }
   ```
   
   ```js src/config.ts
   // src/config.ts
   // When using logger there is a need to set some logger options, this may be done inside config file. 
   // Example of required changes:

   import _ from 'lodash'

   import { TConfig, TEnv } from 'src/types/config.types'

   const noEnvFile = process.env.NO_ENVFILE
   if (_.isNil(noEnvFile)) require('dotenv').config()

   const env = (process.env.NODE_ENV || 'production') as TEnv
   const isDev = env === 'development'
   const isTest = env === 'test'

   const config: TConfig = {
      env,
      isDev,
      isTest,
      name: 'Example app',
      options: {
         port: Number(process.env.APP_PORT) || 3000,
         logLevel: isDev ? 'silly' : 'http',
         silentLogs: isTest,
      },
   }

   export default config
   ```

8. Let's test our logger, we need to add logger into _index.ts_ file:
   ```js index.ts
   // index.ts
   
   import { logger } from 'src/logger'

   logger.info('Hello info!')
   ```

## Shortcut

To create logger and app config please use below tools:

1. Install required packages: `npm install cross-env lodash dotenv`
2. Install dev packages: `npm install -D tsc tsc-alias tsconfig-paths @types/lodash`
3. Add _tsconfig-paths_ into the dev script: `npm set-script dev "npx nodemon -r tsconfig-paths/register src/index.ts"`
4. Add _tsc-alias_ to build script: `npm set-script build "tsc-alias -p tsconfig.json"`
5. Use _cross-env_ package in dev script: `npm set-script dev "cross-env NODE_ENV=development npx nodemon -r tsconfig-paths/register src/index.ts"`
6. Use _cross-env_ package in build script: `npm set-script build "tsc-alias -p tsconfig.json"`
7. Use _cross-env_ package in start script: `npm set-script start "cross-env NODE_ENV=production npx node build/index.js"`
8. Use _cross-env_ package in test script: `npm set-script test "cross-env NODE_ENV=test"`
9. Create logger file: `touch src/logger.ts`
10. Create config file: `touch src/config.ts`
11. Create env file: `touch .env`
12. Inside _.env_ file define port on which app should run.
13. Add _.env_ file into _.gitignore_.
14. Create config file, inside _dotenv_ package should be shown to read _.env_ variables.
15. Create own logger. 
16. Use logger inside _index.ts_ file.