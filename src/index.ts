import { logger } from 'src/logger'
import { startServer } from 'src/server'
import config from 'src/config'

logger.info('Hello info!')

startServer({
    port: config.options.port,
    corsOptions: config.options.cors,
})
