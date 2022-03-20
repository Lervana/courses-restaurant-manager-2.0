# Restaurant manager demo

Demo application for managing orders in a restaurant.
Application written in TypeScript (Node.js).

### Functionalities:

1. Full CRUD of menu, each menu position should have own category, name and price.
2. Application should allow making orders, each order can contain multiple count of menu positions. 
3. Each order should contain at least date, content of the order, prices and order time (from order to bill). 
4. Orders should contain information if it is indoor order or a takeaway option.
5. Tables managing system - each indoor order should be assigned to certain table number. When all tables are set (max tables amount is set by configuration) new orders can be only "take away".
6. When customer finish order (wants to pay), app should generate a bill - each order can be pay on one bill or split in more bills.
8. It should be possible to convert prices to another currency in real time (connection to the currency API).
9. Application should be able to generate reports - orders history by date.

Additional:
- Backend - REST API. 
- Communication in JSON format. 
- API require authorization.

### Tutorial:

_**Base app that should be extended by requirements! All instructions are written and tested on macOS Big Sur.**_

| Step | Content               | File                                                        |
| ---- | --------------------- | ----------------------------------------------------------- |
| 00   | Prerequisites         | [00-prerequisites.md](tutorials/00-prerequisites.md)        |
| 01   | Creating base app     | [01-creating-new-app.md](tutorials/01-creating-base-app.md) |
| 02   | Add TypeScript        | [02-typescript.md](tutorials/02-typescript.md) |
| 03   | Dev environment       | [03-dev-environment.md](tutorials/03-dev-environment.md)    |

