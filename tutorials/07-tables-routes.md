# 07 - Tables routes

### TODO
- [ ] Bills CRUD
- [ ] Menu CRUD
- [ ] Orders CRUD
- [ ] Reports CRUD
- [ ] Tables CRUD
- [ ] Currency API connection

1. Install body parser: ```npm i body-parser```
2. Add body parser to the server [https://www.npmjs.com/package/body-parser]
3. Create data directory ```mkdir src/data```
4. Create tables data file ```touch src/data/tables.json```
5. Define data file structure:
   ```json
   {
      "tablesCount": 15,
      "freeTables": {
         "1": true,
         "2": true,
         "3": true,
         "4": true,
         "5": true,
         "6": true,
         "7": true,
         "8": true,
         "9": true,
         "10": true,
         "11": true,
         "12": true,
         "13": true,
         "14": true,
         "15": true
     }
   }
   ```

6. Create services directory: ```mkdir src/services```
7. Create services for tables: ```touch src/services/tables.service.ts```
8. Create services index.ts for exporting services: ```touch src/services/index.ts```
9. Create services that will provide operations on data files inside `tables.service.ts`. 
10. All custom operations on files (read, write, search data by id etc.) should be moved to separate utils file (ex. `src/services/utils.service.ts`)
11. Package http-status-codes can be used for defining status codes `npm install http-status-codes --save` [https://www.npmjs.com/package/http-status-codes] 

### TODO
- [ ] Bills CRUD
- [ ] Menu CRUD
- [ ] Orders CRUD
- [ ] Reports CRUD
- [x] Tables CRUD
- [ ] Currency API connection