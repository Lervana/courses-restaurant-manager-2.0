import {
    writeFile,
    readFileContent,
    getDataPath,
} from 'src/services/utils.service'

const TABLES_FILE_PATH = getDataPath('tables.json')

type TTable = {
    tablesCount: number
    freeTables: Record<string, boolean>
}

export const setupTables = (tablesCount: number) => {
    const newTablesData: TTable = {
        tablesCount,
        freeTables: {},
    }

    for (let index = 1; index <= tablesCount; index++) {
        newTablesData.freeTables[index] = true
    }

    writeFile(TABLES_FILE_PATH, newTablesData)
}

export const getTables = (): TTable => {
    const data = readFileContent(TABLES_FILE_PATH)
    return JSON.parse(data ?? '')
}

export const getTableStateById = (id: string): boolean => {
    const data = getTables()
    return data?.freeTables?.[id]
}

export const updateTableState = (id: number, state: boolean) => {
    const data = getTables()

    if (id > data?.tablesCount || id < 1 || !data?.freeTables[id]) return false

    data.freeTables[id] = state
    writeFile(TABLES_FILE_PATH, data)

    return true
}
