import path from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import config from 'src/config'

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
