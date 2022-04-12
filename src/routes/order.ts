import { Router, Request, Response } from 'express'

const orderRouter = Router()

orderRouter.get('/', (req: Request, res: Response) => {
    res.send('order: [GET] /')
})

orderRouter.get('/:id', (req: Request, res: Response) => {
    res.send('order: [GET] /' + req.params.id)
})

orderRouter.post('/', (req: Request, res: Response) => {
    res.send('order: [POST] /')
})

orderRouter.delete('/', (req: Request, res: Response) => {
    res.send('order: [DELETE] /')
})

export default orderRouter
