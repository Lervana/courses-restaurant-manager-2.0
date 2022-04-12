import { Router, Request, Response } from 'express'

const statusRouter = Router()

statusRouter.get('/', (req: Request, res: Response) => {
    res.send('status: [GET] /')
})

export default statusRouter
