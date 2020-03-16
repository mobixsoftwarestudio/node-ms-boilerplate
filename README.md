Table of Contents
-----------------

- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

Prerequisites
-------------

- [MongoDB](https://www.mongodb.com/download-center/community)
or [Sequelize](https://sequelize.org/)
- [Node.js 10+](http://nodejs.org)
- Command Line Tools
- Docker
- Jenkins
- Yarn
- Typescript

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/mobixsoftwarestudio/node-ms-boilerplate.git myproject

# Change directory
cd myproject

# Install dependencies
yarn install

# Then simply start your app
yarn dev
```

Project Structure
-----------------

| Name                         | Description                                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **utils**/passport-helper.ts | Passport Local and OAuth strategies, plus login middleware.                                                                                   |
| **utils**/error.ts           | Error handler.                                                                                                                                |
| **utils**/validations.ts     | Scheme validation.                                                                                                                            |
| **modules**/*                | Folder to organize each module. And each module will be accompanied by: **models**, **controllers**, **validators**, **routes**, **business** |
| **database**/*               | Connections with database MongoDB and PostgreSQL                                                                                              |
| **server.ts**                | Entry point to your express app                                                                                                               |
| **__test__**                 | Contains your tests. Separate from source because there is a different build process.                                                         |
| **output**                   | Contains the cobertura coverage xml and tests reports of junit                                                                                |
| .env.example                 | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos.                                                 |
| package.json                 | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                                    |
| tsconfig.json                | Config settings for compiling server code written in TypeScript                                                                               |
| .eslintrc                    | Config settings for ESLint code style checking                                                                                                |
| .eslintignore                | Config settings for paths to exclude from linting                                                                                             |
| .prettierrc.js               | Config settings enforce consistent code style                                                                                                 |
| .sequelizerc                 | Config setting for bootstrap our application with the path specified into the file                                                            |
| nodemon.json                 | Config setting for initiate nodemon                                                                                                           |
| Dockerfile                   | Docker configuration file.                                                                                                                    |
| Jenkinsfile                  | Is a text file that contains the definition of a Jenkins Pipeline and is checked into source control.                                         |
| yarn.lock                    | Contains exact versions of NPM dependencies in package.json.                                                                                  |
|                              |

_ Not completed yet _ 