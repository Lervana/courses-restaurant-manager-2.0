# 02 - TypeScript

Nice links:
- https://nodejs.dev/learn/nodejs-with-typescript
- https://www.npmjs.com/package/npx

Instruction:

1. Install TypeScript and ```ts-node```:
   ```shell
   npm i -D typescript ts-node
   ```

2. Rename ```src/index.js``` to ```src/index.ts```:
   ```shell
   mv src/index.js src/index.ts
   ```

3. Install ```npx``` 
   ```shell
   npm install -g npx
   ```

4. Create own TypeScript configuration. This will generate default TypeScript config inside ```tsconfig.json``` file.
   ```shell
   npx tsc --init
   ```

5. Change content of default ```tsconfig.json``` to:
   ```json
   {
      "compilerOptions": {
         "target": "esnext",
         "module": "commonjs",
         "rootDir": "src",
         "outDir": "build",
         "strict": true,
         "moduleResolution": "node",
         "esModuleInterop": true,
         "resolveJsonModule": true,
         "baseUrl": "./",
         "paths": {
            "src/*": ["./src/*"]
         }
       },
      "include": ["src/**/*"]
   }
   ```

6. Change scripts in ```package.json```:
   ```shell
   npm set-script start "npx node build/index.js"
   npm set-script build "npx tsc -p tsconfig.json"
   npm set-script dev "npx ts-node src/index.ts"
   ```

7. Run app by typing:
   ```shell
   npm run build
   npm run start
   ```

   or run dev files by typing:
   ```shell
   npm run dev
   ```

8. Add excluded files to *.gitignore.* to not push them into the repo:
   ```text .gitignore
   /node_modules
   /build
   ```

## Shortcut

To include TypeScript in this application, follow these steps:

1. Install TypeScript and *ts-node*: ```npm i -D typescript ts-node```
2. Rename *src/index.js* to *src/index.ts*: ```mv src/index.js src/index.ts```
3. Install *npx*: ```npm install -g npx```
4. Create TypeScript configuration: ```npx tsc --init```
5. Adjust content of default ```tsconfig.json```.
6. Change *start* script in *package.json*: ```npm set-script start "npx node build/index.js"```
7. Change *build* script in *package.json*: ```npm set-script build "npx tsc -p tsconfig.json"```
8. Change *dev* script in *package.json*: ```npm set-script dev "npx ts-node src/index.ts"```
9. Run app by typing: ```npm run build``` and then ```npm run start``` or run dev files by typing ```npm run dev```
10. Add excluded files to *.gitignore.* to not push them into the repo.
