import { Router, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import {
    getMenu,
    getMenuItem,
    addToMenu,
    updateMenuItem,
    deleteMenuItem,
    MENU_ERRORS,
} from 'src/services'
import { logger } from 'src/logger'
import { TCategory, Categories, TMenuItem } from 'src/types/model.types'
import { handleError } from 'src/routes/utils.routes'

const menuRouter = Router()

const isMenuItemValid = (
    name: string,
    price: number,
    category: TCategory,
    res: Response,
) => {
    if (name?.length < 3) {
        res.status(StatusCodes.BAD_REQUEST).send(
            'Invalid name, it must have at least 3 chars',
        )
        return false
    }

    if (price <= 0) {
        res.status(StatusCodes.BAD_REQUEST).send('Price must be higher than 0')
        return false
    }

    if (Categories.indexOf(category) === -1) {
        res.status(StatusCodes.BAD_REQUEST).send('Invalid category')
        return false
    }

    return true
}

menuRouter.get('/', (req: Request, res: Response) => {
    try {
        const data = getMenu()
        res.status(StatusCodes.OK).json(data)
    } catch (err) {
        handleError(res, err, MENU_ERRORS)
    }
})

menuRouter.get('/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = getMenuItem(id)

        if (data) res.status(StatusCodes.OK).json(data)
        else res.status(StatusCodes.NOT_FOUND).send()
    } catch (err) {
        handleError(res, err, MENU_ERRORS)
    }
})

menuRouter.post('/', (req: Request, res: Response) => {
    try {
        const { name, price, category } = req.body

        if (isMenuItemValid(name, price, category, res)) {
            const itemToAdd: TMenuItem = { name, price, category } as TMenuItem
            const newItem = addToMenu(itemToAdd)
            res.status(StatusCodes.CREATED).json(newItem)
        }
    } catch (err) {
        handleError(res, err, MENU_ERRORS)
    }
})

menuRouter.patch('/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { id: newId, name, price, category } = req.body

        if (isMenuItemValid(name, price, category, res)) {
            const old = getMenuItem(id)
            if (!old) {
                res.status(StatusCodes.NOT_FOUND).send()
            } else {
                const updated = {
                    id: newId ?? old?.id,
                    category: category ?? old?.category,
                    name: name ?? old?.name,
                    price: price ?? old?.price,
                }

                updateMenuItem(id, updated)
                res.status(StatusCodes.OK).json(updated)
            }
        }
    } catch (err) {
        handleError(res, err, MENU_ERRORS)
    }
})

menuRouter.delete('/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const old = getMenuItem(id)
        if (!old) {
            res.status(StatusCodes.NOT_FOUND).send()
        } else {
            deleteMenuItem(id)
            res.status(StatusCodes.OK).send()
        }
    } catch (err) {
        const error = err as Error
        logger.error(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
    }
})

export default menuRouter
