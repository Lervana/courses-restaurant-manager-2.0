import { Router, Request, Response } from 'express'

const tableRouter = Router()

tableRouter.get('/', (req: Request, res: Response) => {
    res.send('table: [GET] /')
})

tableRouter.get('/:id', (req: Request, res: Response) => {
    res.send('table: [GET] /')
})

tableRouter.post('/', (req: Request, res: Response) => {
    res.send('table: [POST] /')
})

tableRouter.put('/', (req: Request, res: Response) => {
    res.send('table: [PUT] /')
})

tableRouter.patch('/', (req: Request, res: Response) => {
    res.send('table: [PATCH] /')
})

tableRouter.delete('/', (req: Request, res: Response) => {
    res.send('table: [DELETE] /')
})

export default tableRouter
