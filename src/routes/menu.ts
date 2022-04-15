import { Router, Request, Response } from 'express'

const menuRouter = Router()

menuRouter.get('/', (req: Request, res: Response) => {
    res.send('menu: [GET] /')
})

menuRouter.get('/:id', (req: Request, res: Response) => {
    res.send('menu: [GET] /' + req.params.id)
})

menuRouter.post('/', (req: Request, res: Response) => {
    res.send('menu: [POST] /')
})

menuRouter.patch('/', (req: Request, res: Response) => {
    res.send('menu: [PATCH] /')
})

menuRouter.delete('/:id', (req: Request, res: Response) => {
    res.send('menu: [DELETE] /')
})

export default menuRouter
