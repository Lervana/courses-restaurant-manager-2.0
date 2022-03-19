# 01 - Base app

To create a new application, follow these steps:
1. Type `npm init` and type requested fields (name, description etc.). As a result you should see this content of package.json:
    ```json
    {
      "name": "courses-restaurant-manager-2.0",
      "version": "1.0.0",
      "description": "Demo application for managing orders in a restaurant. Application written in TypeScript (Node.js).",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "repository": {
        "type": "git",
        "url": "git+https://github.com/Lervana/courses-restaurant-manager-2.0.git"
      },
      "author": "Lervana Katarzyna Dadek",
      "license": "MIT",
      "bugs": {
        "url": "https://github.com/Lervana/courses-restaurant-manager-2.0/issues"
      },
      "homepage": "https://github.com/Lervana/courses-restaurant-manager-2.0#readme"
    }
    ```

2. Add ```index.js``` file inside ```src``` directory:
   ```shell
      mkdir src
      touch src/index.js
   ```

3. Add ```console.log``` into the ```index.js``` file:
   ```js index.js
   console.log('Hello World!');
   ```

4. Run command: ```npm set-script dev "node src/index.js"``` it will add *dev* script into package.json

5. Now you can run app by typing: ```npm run dev```

## Shortcut

To create a new application, follow these steps:

1. Type `npm init` and type requested fields (name, description etc.).
2. Add ```index.js``` file inside ```src``` directory.
3. Add ```console.log``` into the ```index.js``` file.
4. Add ```run``` script inside ```package.json```.
5. Type ```npm run dev``` in the terminal.
