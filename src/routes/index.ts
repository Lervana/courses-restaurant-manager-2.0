import { Router } from 'express'

import billRouter from 'src/routes/bill'
import menuRouter from 'src/routes/menu'
import orderRouter from 'src/routes/order'
import reportRouter from 'src/routes/report'
import statusRouter from 'src/routes/status'
import tableRouter from 'src/routes/table'

const mainRouter = Router()
mainRouter.use('/bill', billRouter)
mainRouter.use('/menu', menuRouter)
mainRouter.use('/order', orderRouter)
mainRouter.use('/report', reportRouter)
mainRouter.use('/status', statusRouter)
mainRouter.use('/table', tableRouter)

export default mainRouter
