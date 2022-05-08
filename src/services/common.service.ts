import { writeFile, readFileContent } from 'src/services/utils.service'

export type CommonOptions = {
    path: string
}

export interface WithIdProp extends Object {
    id: string | number
}

export class CommonService {
    create = <T extends object>(data: T, options: CommonOptions): void => {
        const storedData = readFileContent(options.path)
        const parsedStoredData = JSON.parse(storedData ?? '') as T[]
        parsedStoredData.push(data)
        writeFile(options.path, parsedStoredData)
    }

    readAll = <T extends object>(options: CommonOptions) => {
        const data = readFileContent(options.path)
        return JSON.parse(data ?? '') as T[]
    }

    readOneById = <T extends WithIdProp>(id: number | string, options: CommonOptions) => {
        const data = readFileContent(options.path)
        const parsedData = JSON.parse(data ?? '') as T[]
        return parsedData.find((item) => item.id === id)
    }

    find = <T extends WithIdProp>(
        search: (this: void, value: T, index: number, obj: T[]) => T,
        options: CommonOptions,
    ) => {
        const data = readFileContent(options.path)
        const parsedData = JSON.parse(data ?? '') as T[]
        return parsedData.find(search)
    }

    createOrUpdate = <T extends WithIdProp>(newData: T, options: CommonOptions) => {
        const storedData = readFileContent(options.path)
        const parsedStoredData = JSON.parse(storedData ?? '') as T[]
        const newItems = []

        let isAdded = false

        parsedStoredData.forEach((item) => {
            if (item.id === newData.id) {
                newItems.push(newData)
                isAdded = true
            } else {
                newItems.push(item)
            }
        })

        if (!isAdded) newItems.push(newData)
        writeFile(options.path, newItems)
    }

    deleteItem = <T extends WithIdProp>(id: string | number, options: CommonOptions) => {
        const storedData = readFileContent(options.path)
        const parsedStoredData = JSON.parse(storedData ?? '') as T[]
        const newItems: T[] = []

        parsedStoredData.forEach((item) => {
            if (item.id !== id) newItems.push(item)
        })

        writeFile(options.path, newItems)
    }
}
