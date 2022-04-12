import { Router, Request, Response } from 'express'

const billRouter = Router()

billRouter.get('/', (req: Request, res: Response) => {
    res.send('bill: [GET] /')
})

billRouter.get('/:id', (req: Request, res: Response) => {
    res.send('bill: [GET] /')
})

billRouter.post('/', (req: Request, res: Response) => {
    res.send('bill: [POST] /')
})

billRouter.delete('/', (req: Request, res: Response) => {
    res.send('bill: [DELETE] /')
})

export default billRouter
