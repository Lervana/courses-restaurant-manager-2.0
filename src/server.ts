import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import limit from 'express-rate-limit'
import bodyParser from 'body-parser'

import { logger } from 'src/logger'
import { TServer } from 'src/types/server.types'
import config from 'src/config'
import mainRouter from 'src/routes'

const LIMITER_TIME = 15 * 60 * 1000
const LIMITER_MAX = 250

export const startServer = ({ port, corsOptions }: TServer) => {
    const server = express()

    server.use(helmet())
    server.use(cors(corsOptions || {}))
    server.disable('x-powered-by')
    server.use(limit({ windowMs: LIMITER_TIME, max: LIMITER_MAX }))
    server.use(bodyParser.json())
    server.use(mainRouter)

    logger.info(`Server will be started at port ${port}`)
    logger.info('Starting server...')

    server.listen(port, () => {
        logger.info(`Server for ${config.name} ready at port ${port}`)
    })
}
