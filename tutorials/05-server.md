# 05 - Server

Server will be build on Express.js [https://www.npmjs.com/package/express]

1. Install express and some useful middlewares:
    - express [https://www.npmjs.com/package/express]
    - express-rate-limit [https://www.npmjs.com/package/express-rate-limit]
    - helmet [https://www.npmjs.com/package/helmet]
    - cors [https://www.npmjs.com/package/cors]
    - dotenv [https://www.npmjs.com/package/dotenv]
    - lodash [https://www.npmjs.com/package/lodash]

   ```shell
    npm install express express-rate-limit helmet cors
    npm install -D @types/cors @types/express
   ```

2. Create a file for implementing express server: `touch src/server.ts`. Add method that will start server:

   ```js
   // src/server.ts

   export const startServer = () => {
        console.log('Server started')
   }
   ```

3. Create a file with server connected types: `touch src/types/server.types.ts`.

   ```js
   // src/types/server.types.ts

   export type TServer = {
      port: number
   }
   ```

4. Call _startServer_ method from _index.ts_:
    ```js
    // src/index.ts
   
    import { logger } from 'src/logger'
    import { startServer } from 'src/server'
    logger.info('Hello info!')

    startServer({
       port: 5555,
    })
    ```

5. Run app in dev mode to see if everything is working: `npm run dev`. You do not need restart app to see
   changes because nodemon will watch files for you. On each change it will restart app. You may try now
   change port number. App will restart.
   ***Important:*** After changes inside _.env_ app must be manually restarted.


7. Change code inside _index.ts_ to use config instead of predefined port number.
   ```js src/index.ts
   // src/index.ts
   
   import { logger } from 'src/logger'
   import { startServer } from 'src/server'
   import config from 'src/config'

   logger.info('Hello info!')

   startServer({
      port: config.options.port,
   })
   ```

8. Extend startServer method to setup Express server:
   - Import _express_ inside _server.ts_.
   - Add middlewares: _cors_, _helmet_, _express-rate-limit_.
   - Update _index.ts_ and _config.ts_.

   ```js src/types/server.types.ts
   // src/types/server.types.ts
   
   import { CorsOptions } from 'cors'
   
   export type TServer = {
      port: number
      corsOptions: CorsOptions
   }
   ```

   ```js src/types/config.types.ts
   // src/types/config.types.ts
   
   import { CorsOptions } from 'cors'
   
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
         cors: CorsOptions
      }
   }
   ```
   
   ```js
   // config.ts

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
   ```
   
   ```js server.ts
   // server.ts
   import express from 'express'
   import cors from 'cors'
   import helmet from 'helmet'
   import limit from 'express-rate-limit'

   import { logger } from 'src/logger'
   import { TServer } from 'src/types/server.types'
   import config from 'src/config'

   const LIMITER_TIME = 15 * 60 * 1000
   const LIMITER_MAX = 250

   export const startServer = ({ port, corsOptions }: TServer) => {
      const server = express()

      server.use(helmet())
      server.use(cors(corsOptions || {}))
      server.disable('x-powered-by')
      server.use(limit({ windowMs: LIMITER_TIME, max: LIMITER_MAX }))

      logger.info(`Server will be started at port ${port}`)
      logger.info('Starting server...')

      server.listen(port, () => {
         logger.info(`Server for ${config.name} ready at port ${port}`)
      })
   }
   ```
   
   ```js index.ts
   // index.ts
   
   import { logger } from 'src/logger'
   import { startServer } from 'src/server'
   import config from 'src/config'
   
   logger.info('Hello info!')
   
   startServer({
      port: config.options.port,
      corsOptions: config.options.cors,
   })
   ```
   
