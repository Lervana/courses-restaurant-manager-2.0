# 08 - Tables tests

1. Create tests folder: `mkdir tests`
2. Install required packages: `npm i -D jest ts-jest @types/jest axios concurrently`
3. Run config ```npx ts-jest config:init```
4. Add `APP_TEST_PORT` inside *.env* file.
5. Change port line inside *src.config.ts* file"
   ```ts
   const port = isTest
       ? Number(process.env.APP_TEST_PORT) || 3001
       : Number(process.env.APP_PORT) || 3000
   ```
6. Add test script: `npm set-script test "cross-env NODE_ENV=test npx ts-node -r tsconfig-paths/register src/index.ts"`
7. Add tests script: `npm set-script tests "concurrently --kill-others \"npm run test\" \"jest\""`
8. Add tests:watch script: `npm set-script tests:watch "concurrently --kill-others \"npm run test\" \"jest --watch\""`
9. Create routes tests folder: `mkdir tests/routes`
10. Create tables routes test file: `touch tests/routes/table.test.ts`
11. Create test data folder: `mkdir src/data/test`
12. Create prod data folder: `mkdir src/data/prod`
13. Move *tables.json* into *src/data/prod*
14. Copy *tables.json* into *src/data/test*

15. Add getPath method inside *utils.services.ts*:
   ```ts utils.services.ts
   export const getDataPath = (fileName: string) => {
       return path.join(
           __dirname,
           config.isTest ? '../data/test' : '../data/prod',
           fileName,
       )
   }
   ```

16. Change *tables.services.ts* to getDataPath:
   ```ts tables.service.ts
   const TABLES_FILE_PATH = getDataPath('tables.json')
   ```

17. Create test utils: ```touch tests/utils.ts```
18. Add *getApiUrl* method inside *tests/utils.ts*
   ```ts tests/utils.ts
   import { config } from 'dotenv'
   
   config()
   
   const PORT = Number(process.env.APP_TEST_PORT) || 3001
   const BASE_URL = 'http://localhost'
   
   export const getApiUrl = (): string => {
       return `${BASE_URL}:${PORT}`
   }
   ```
19. Add ignore pattern inside *jest.config.js*: `modulePathIgnorePatterns: ['<rootDir>/src/data/']`
20. Write tests and use them to check if API works properly. 