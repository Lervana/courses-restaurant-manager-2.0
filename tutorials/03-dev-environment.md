# 03 - Setup development environment

Nice links:
- https://www.npmjs.com/package/nodemon
- https://www.npmjs.com/package/ts-node
- https://www.npmjs.com/package/eslint
- https://www.npmjs.com/package/prettier
- https://www.npmjs.com/package/husky
- https://www.npmjs.com/package/lint-staged

### Nodemon
Nodemon - a tool that watches files and restarts the app automatically when files changed.

1. Install _nodemon_.
   ```shell
   npm i -D nodemon
   ```

2. Install _ts-node_.
   ```shell
   npm i -D ts-node
   ```

3. Change _dev_ script inside _package.json_:
   ```shell
   npm set-script dev "npx nodemon src/index.ts"
   ```

### ESlint

ESlint is a very useful tool - it requires that certain rules are met in the code.

1. Install eslint:
   ```shell
   npm i -D eslint @eslint/create-config
   ```

2. Type: `npm init @eslint/config` and pick options:

   | Question                                           | Answer                               |
   | -------------------------------------------------- | ------------------------------------ |
   | How would you like to use ESLint?                  | _To check syntax and find problems_  |
   | What type of modules does your project use?        | _JavaScript modules (import/export)_ |
   | Which framework does your project use?             | _None of these_                      |
   | Does your project use TypeScript?                  | _Yes_                                |
   | Where does your code run?                          | _Node_                               |
   | What format do you want your config file to be in? | _JSON_                               |
   |  Would you like to install them now with npm?      | _Yes_                                |

   This will create .eslintrc.json file.


3. Add one rule to eslint -> `@typescript-eslint/no-explicit-any`:

    ```json .eslintrc.json
    {
        "env": {
            "browser": true,
            "es2021": true
        },
        "extends": [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "ecmaVersion": "latest",
            "sourceType": "module"
        },
        "plugins": [
            "@typescript-eslint"
        ],
        "rules": {
            "@typescript-eslint/no-explicit-any": 0
        }
    }
    ```

### Prettier
To keep code clean please use _Prettier_:

1. Install prettier:
   ```shell
   npm i -D prettier
   ```

2. Create _.prettierrc.json_ file:
   ```shell
   touch .prettierrc.json
   ```

3. Add _Prettier_ setup inside _.prettierrc.json_:

   ```json
   {
      "trailingComma": "all",
      "tabWidth": 4,
      "semi": false,
      "singleQuote": true
   }
   ```

4. If you want to use semicolons please change _"semi"_ to _true_.
5. Add _prettier_ support to IDE. For WebStorm go to _Preferences_ > _Languages & Frameworks_ > _JavaScript_ > _Prettier_ and set Node interpreter and prettier package. Please check boxes _on code reformat_ and _on save_. IDE may require restart.

### Prettier integration with ESlint
Prettier need to be connected with ESlint. In that case you need to:

1. Add eslint-config-prettier:
   ```shell
   npm i -D eslint-config-prettier
   ```

2. Change _extends_ in .eslintrc.json file into:
     ```json .eslintrc.json
     {
         "env": {
             "browser": true,
             "es2021": true
         },
         "extends": [
             "eslint:recommended",
             "plugin:@typescript-eslint/recommended",
             "prettier"
         ],
         "parser": "@typescript-eslint/parser",
         "parserOptions": {
             "ecmaVersion": "latest",
             "sourceType": "module"
         },
         "plugins": [
             "@typescript-eslint"
         ],
         "rules": {
             "@typescript-eslint/no-explicit-any": 0
         }
     }
     ```

### Husky and lint-staged
Husky helps with making _Prettier_ reformatting code before each commit. It improves code quality even if 
the developer has no _Prettier_ connected to IDE! _Lint-staged_ allows running linters against staged git files. 
Combined prevent committing not wanted mistakes.

1. Install _husky_ and _lint-staged_ by typing:
   ```shell
   npm i -D husky lint-staged
   ```

2. Then run configuration commands:
   ```shell
   npx husky install
   npm set-script prepare "husky install"
   npx husky add .husky/pre-commit "npx lint-staged"
   ```

3. Add the following to your package.json at the bottom of the file:
     ```json
     {
       "lint-staged": {
         "src/**/*": ["eslint --fix", "prettier --write --ignore-unknown"]
       }
     }
     ```

**WARNING**

When _husky_ is not working because it cannot - for example - find npx please add file `~/.huskyrc` containing this content:
[Source: https://lifesaver.codes/answer/bug-commit-from-vscode-912]

   ```shell
   # ~/.huskyrc
   # Solution for Mac
   
   export NVM_DIR="$HOME/.nvm"
   [ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"

   export NVM_DIR="$HOME/.nvm"
   a=$(nvm ls | grep 'node')
   b=${a#*(-> }
   v=${b%%[)| ]*}
   
   export PATH="$NVM_DIR/versions/node/$v/bin:$PATH"
   ```

## Shortcut

To keep the application clean and readable please use below tools:

1. Install _nodemon_: `npm i -D nodemon`.
2. Install _ts-node_: `npm i -D ts-node`.
3. Change _dev_ script inside _package.json_: `npm set-script dev "npx nodemon src/index.ts"`
4. Install eslint: `npm i -D eslint @eslint/create-config`.
5. Initialize eslint config: `npm init @eslint/config`.
6. Add rule to eslint -> `@typescript-eslint/no-explicit-any` and set it to _0_.
7. Install prettier: `npm i -D prettier`.
8. Create _.prettierrc.json_ file: `touch .prettierrc.json`.
9. Set _.prettierrc.json_ content.
10. If you want to use semicolons please change _"semi"_ to _true_.
11. Add _prettier_ support to IDE. For WebStorm go to _Preferences_ > _Languages & Frameworks_ > _JavaScript_ > _Prettier_ and set Node interpreter and prettier package. Please check boxes _on code reformat_ and _on save_. IDE may require restart.
12. Add eslint-config-prettier: `npm i -D eslint-config-prettier`.
13. Change _extends_ in .eslintrc.json file: ` "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"]`.
14. Install packages by typing `npm i -D husky lint-staged`.
15. Install husky: `npx husky install`.
16. Set scripts: `npm set-script prepare "husky install"`.
17. Add hooks: `npx husky add .husky/pre-commit "npx lint-staged"`.
18. Add _lint-staged_ config in _package.json_.
