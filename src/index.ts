import { startServer } from 'src/server'
import config from 'src/config'

console.log('Env: ' + config.env)

startServer({
    port: config.options.port,
    corsOptions: config.options.cors,
})
