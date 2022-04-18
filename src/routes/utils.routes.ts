import { Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

import { logger } from 'src/logger'

export const handleError = (
    res: Response,
    err: any,
    errorCodes: Record<string, { status: number; message: string }>,
) => {
    const error = err as Error
    const customError = errorCodes[error?.message]

    logger.error(customError?.message ?? error?.message)

    if (customError)
        res.status(customError.status).send({ error: customError.message })
    else
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        })
}
