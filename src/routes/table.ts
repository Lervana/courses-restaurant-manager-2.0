import { Router, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    getTables,
    getTableStateById,
    setupTables,
    updateTableState,
} from 'src/services'

const tableRouter = Router()

tableRouter.get('/', (req: Request, res: Response) => {
    const data = getTables()
    res.status(StatusCodes.OK).json(data)
})

tableRouter.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params
    const data = getTableStateById(id)

    if (data === undefined || data === null) {
        res.status(StatusCodes.NOT_FOUND).send()
    } else {
        res.status(StatusCodes.OK).json({ [id]: data })
    }
})

tableRouter.post('/', (req: Request, res: Response) => {
    const count = Number(req?.body?.tablesCount)

    if (Number.isNaN(count) || count < 1) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid tables count, please set value between 1 and 100',
        })
    } else {
        setupTables(count)
        res.status(StatusCodes.CREATED).send()
    }
})

tableRouter.patch('/', (req: Request, res: Response) => {
    const id = Number(req?.body?.id)
    const newState = req?.body?.state
    const currentData = getTables()

    if (Number.isNaN(id) || !id || id < 0 || id > currentData?.tablesCount) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid table id',
        })
    }

    updateTableState(id, newState)
    res.status(StatusCodes.OK).send()
})

export default tableRouter
