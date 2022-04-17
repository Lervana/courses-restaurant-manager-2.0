import axios, { AxiosError } from 'axios'

import { getApiUrl } from '../utils'
import { writeFileSync } from 'fs'
import * as path from 'path'

const TABLES_COUNT = 10
const FREE_TABLES = {
    '1': true,
    '2': true,
    '3': true,
    '4': true,
    '5': true,
    '6': true,
    '7': true,
    '8': true,
    '9': true,
    '10': true,
}
const DATA = {
    tablesCount: TABLES_COUNT,
    freeTables: FREE_TABLES,
}

const TABLES_FILE_PATH = path.join(__dirname, '../../src/data/test/tables.json')
const API_URL = getApiUrl() + '/table'

describe('table.service.ts', () => {
    afterEach(() => {
        writeFileSync(TABLES_FILE_PATH, JSON.stringify(DATA, null, 4))
    })

    describe('GET /table', () => {
        it('GET should return tables stored inside tables data file', async () => {
            const result = await axios.get(API_URL)
            expect(result.status).toEqual(200)
            expect(result.data).toEqual(DATA)
        })
    })

    describe('GET /table/:id', () => {
        it('GET table by id should return table info', async () => {
            const result = await axios.get(API_URL + '/2')
            expect(result.status).toEqual(200)
            expect(result.data).toEqual({ 2: true })
        })

        it('GET table by id when id is unknown should return not found status', async () => {
            try {
                await axios.get(API_URL + '/200')
            } catch (err) {
                expect((err as AxiosError).response?.status).toEqual(404)
                expect((err as AxiosError).response?.data).toEqual('')
            }
        })
    })

    describe('POST /table', () => {
        it('POST table should create new data with all free tables and store it into data file', async () => {
            const result = await axios.post(API_URL, { tablesCount: 3 })
            expect(result.status).toEqual(201)
            expect(result.data).toEqual('')
        })

        it('POST table should not create new data when tablesCount is invalid', async () => {
            try {
                await axios.post(API_URL, { tablesCount: -2 })
            } catch (err) {
                expect((err as AxiosError).response?.status).toEqual(400)
                expect((err as AxiosError).response?.data).toEqual({
                    error: 'Invalid tables count, please set value between 1 and 100',
                })
            }

            const result2 = await axios.get(API_URL)
            expect(result2.status).toEqual(200)
            expect(result2.data).toEqual(DATA)
        })
    })

    describe('PATCH /table', () => {
        it('PATCH table should update only one table', async () => {
            const result = await axios.get(API_URL + '/2')
            expect(result.status).toEqual(200)
            expect(result.data).toEqual({ 2: true })

            const result2 = await axios.patch(API_URL, {
                id: 2,
                state: false,
            })
            expect(result2.status).toEqual(200)
            expect(result2.data).toEqual('')

            const result3 = await axios.get(API_URL + '/2')
            expect(result3.status).toEqual(200)
            expect(result3.data).toEqual({ 2: false })
        })

        it('PATCH table should not update data if id is invalid', async () => {
            const result = await axios.get(API_URL)
            expect(result.status).toEqual(200)
            expect(result.data).toEqual(DATA)

            try {
                await axios.patch(API_URL, {
                    id: 'error',
                    state: false,
                })
            } catch (err) {
                expect((err as AxiosError).response?.status).toEqual(400)
                expect((err as AxiosError).response?.data).toEqual({
                    error: 'Invalid table id',
                })
            }

            const result3 = await axios.get(API_URL)
            expect(result3.status).toEqual(200)
            expect(result3.data).toEqual(DATA)
        })

        it('PATCH table should not update data if id is to low', async () => {
            const result = await axios.get(API_URL)
            expect(result.status).toEqual(200)
            expect(result.data).toEqual(DATA)

            try {
                await axios.patch(API_URL, {
                    id: 0,
                    state: false,
                })
            } catch (err) {
                expect((err as AxiosError).response?.status).toEqual(400)
                expect((err as AxiosError).response?.data).toEqual({
                    error: 'Invalid table id',
                })
            }

            const result3 = await axios.get(API_URL)
            expect(result3.status).toEqual(200)
            expect(result3.data).toEqual(DATA)
        })

        it('PATCH table should not update data if id is to high', async () => {
            const result = await axios.get(API_URL)
            expect(result.status).toEqual(200)
            expect(result.data).toEqual(DATA)

            try {
                await axios.patch(API_URL, {
                    id: 100,
                    state: false,
                })
            } catch (err) {
                expect((err as AxiosError).response?.status).toEqual(400)
                expect((err as AxiosError).response?.data).toEqual({
                    error: 'Invalid table id',
                })
            }

            const result3 = await axios.get(API_URL)
            expect(result3.status).toEqual(200)
            expect(result3.data).toEqual(DATA)
        })
    })
})
