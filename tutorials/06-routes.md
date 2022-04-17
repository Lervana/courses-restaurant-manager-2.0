# 06 - Routes

1. Create directory where routes will be stored: `mkdir src/routes`

2. Add index.ts that wil contain main router: `touch src/routes/index.ts`

3. Add main router implementation into index.ts:
    ```ts src/routes/index.ts
    import { Router } from 'express'

    const mainRouter = Router()

    export default mainRouter
   ```
   
4. Use main router inside server.ts:
    ```ts src/server.ts
   //...
   import mainRouter from 'src/routes'
    //...
   
    export const startServer = ({ port, corsOptions }: TServer) => {
        //...
        server.use(mainRouter)
        //... 
    }
   ```

5. For each important path (like '/user' or '/menu') separate router should be crated and used inside 
(check the repository to see example structure)
6. Each subrouter should provide all methods available for user/menu etc [https://expressjs.com/en/4x/api.html]
7. Create local postman project [https://www.postman.com/]:
   - Download and open Postman
   - Create new workspace
   - Add routes
   - Test connection to the backend