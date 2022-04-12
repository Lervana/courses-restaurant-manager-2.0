import { Router, Request, Response } from 'express'

const reportRouter = Router()

reportRouter.get('/', (req: Request, res: Response) => {
    res.send('report: [GET] /')
})

reportRouter.get('/:id', (req: Request, res: Response) => {
    res.send('report: [GET] /' + req.params.id)
})

export default reportRouter
