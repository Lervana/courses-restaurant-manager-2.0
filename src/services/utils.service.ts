import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import config from 'src/config'
import { TData, TItem } from 'src/types/model.types'

export const readFile = (path: string) => readFileSync(path, 'utf-8')

export const fileExists = (path: string) => {
    try {
        return existsSync(path)
    } catch (err) {
        return false
    }
}

export const readFileContent = (filePath: string) => {
    if (fileExists(filePath)) {
        return readFile(path.join(filePath))
    }

    throw new Error('Błąd, podany plik nie istnieje: ' + filePath)
}

export const readJsonFileContent = <T>(filePath: string): T => {
    const content = readFileContent(path.join(filePath))

    try {
        return JSON.parse(content)
    } catch (err) {
        throw new Error(`Cannot parse file ${filePath}`)
    }
}

export const writeFile = (filePath: string, data: object): void => {
    return writeFileSync(filePath, JSON.stringify(data, null, 4))
}

export const getDataPath = (fileName: string) => {
    return path.join(
        __dirname,
        config.isTest ? '../data/test' : '../data/prod',
        fileName,
    )
}

// Data operations
export const getAll = <T extends TItem>({
    dataFilePath,
    dataFileNotFoundError,
}: {
    dataFilePath: string
    dataFileNotFoundError: string
}): TData<T> => {
    const content = readFileContent(dataFilePath)
    if (!content) throw new Error(dataFileNotFoundError)
    return JSON.parse(content) as TData<T>
}

export const getOne = <T extends TItem>({
    dataFilePath,
    dataFileNotFoundError,
    id,
}: {
    dataFilePath: string
    dataFileNotFoundError: string
    id: string
}): T | undefined => {
    const content = readFileContent(dataFilePath)
    if (!content) throw new Error(dataFileNotFoundError)

    const data = JSON.parse(content) as TData<T>
    return data?.items?.find((item) => item.id === id)
}

export const getOneBy = <T extends TItem>({
    dataFilePath,
    dataFileNotFoundError,
    filter,
}: {
    dataFilePath: string
    dataFileNotFoundError: string
    filter: (item: T) => boolean
}): T | undefined => {
    const content = readFileContent(dataFilePath)
    if (!content) throw new Error(dataFileNotFoundError)

    const data = JSON.parse(content) as TData<T>
    return data?.items?.find((item) => filter(item))
}

export const add = <T extends TItem>({
    dataFilePath,
    dataFileNotFoundError,
    dataNotUniqueError,
    isUnique,
    newItem,
}: {
    dataFilePath: string
    dataFileNotFoundError: string
    dataNotUniqueError: string
    isUnique: (item: T, newItem: T) => boolean
    newItem: T
}) => {
    const content = readFileContent(dataFilePath)
    if (!content) throw new Error(dataFileNotFoundError)

    const data = JSON.parse(content) as TData<T>
    const now = new Date().toISOString()
    if (!data.createDate) data.createDate = now
    data.lastUpdateDate = now

    if (data?.items?.find((item) => !isUnique(item, newItem)))
        throw new Error(dataNotUniqueError)

    const itemToAdd = { ...newItem }
    itemToAdd.id = uuidv4()

    if (!data.items) data.items = []
    data.items.push(itemToAdd)

    writeFile(dataFilePath, data)
    return itemToAdd
}

export const update = <T extends TItem>({
    dataFilePath,
    dataFileNotFoundError,
    dataNotUniqueError,
    isUnique,
    updatedItem,
    id,
    dataNotFoundError,
}: {
    dataFilePath: string
    dataFileNotFoundError: string
    dataNotUniqueError: string
    dataNotFoundError: string
    isUnique: (item: T, newItem: T) => boolean
    updatedItem: T
    id: string
}) => {
    const content = readFileContent(dataFilePath)
    if (!content) throw new Error(dataFileNotFoundError)

    const data = JSON.parse(content) as TData<T>
    data.lastUpdateDate = new Date().toISOString()

    if (data?.items?.find((item) => !isUnique(item, updatedItem)))
        throw new Error(dataNotUniqueError)

    const updatedItems: T[] = []
    let itemNotFound = true

    for (const old of data.items) {
        if (old.id === id) {
            itemNotFound = false
            updatedItems.push({ ...old, ...updatedItem })
        } else {
            updatedItems.push(old)
        }
    }

    if (itemNotFound) throw new Error(dataNotFoundError)
    data.items = updatedItems
    writeFile(dataFilePath, data)
}

export const remove = <T extends TItem>({
    dataFilePath,
    dataFileNotFoundError,
    dataNotFoundError,
    id,
}: {
    dataFilePath: string
    dataFileNotFoundError: string
    dataNotFoundError: string
    id: string
}) => {
    const content = readFileContent(dataFilePath)
    if (!content) throw new Error(dataFileNotFoundError)

    const data = JSON.parse(content) as TData<T>
    data.lastUpdateDate = new Date().toISOString()

    const updatedItems: T[] = []
    let itemNotFound = true

    for (const old of data.items) {
        if (old.id === id) {
            itemNotFound = false
        } else {
            updatedItems.push(old)
        }
    }

    if (itemNotFound) throw new Error(dataNotFoundError)
    data.items = updatedItems
    writeFile(dataFilePath, data)
}
