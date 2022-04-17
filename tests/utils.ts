import { config } from 'dotenv'

config()

const PORT = Number(process.env.APP_TEST_PORT) || 3001
const BASE_URL = 'http://localhost'

export const getApiUrl = (): string => {
    return `${BASE_URL}:${PORT}`
}
