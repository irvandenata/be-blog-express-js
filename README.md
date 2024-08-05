# Blog REST API with Express.js and TypeScript

## Overview

This project is a REST API for a blog application built with Express.js and TypeScript. It provides endpoints for user authentication, blog post creation, updating, deletion, and other blog-related functionalities. The API is designed to be secure, scalable, and easy to maintain.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get a local copy of the project up and running, follow these simple steps.

## Prerequisites

- Node.js (version 14 or above)
- npm or yarn
- PostgreSQL

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/blog-rest-api.git
    cd blog-rest-api
    ```

2. Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of the project and add the following variables:

    ```env
    PORT=3000
    DATABASE_URL=your_postgresql_database_url
    JWT_SECRET=your_jwt_secret
    ```

4. Run database migrations:

    ```sh
    npx sequelize-cli db:migrate
    ```

## Running the Project

To start the development server:

```sh
npm run dev
# or
yarn dev

# Project Structure

The project structure is organized as follows:


├── src
│ ├── config
│ ├── controllers
│ ├── middlewares
│ ├── models
│ ├── routes
│ ├── services
│ ├── utils
│ ├── validators
│ └── index.ts
├── tests
├── .env
├── .gitignore
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md


- **config**: Configuration files, including database configuration.
- **controllers**: Functions to handle the HTTP requests.
- **middlewares**: Custom middleware functions.
- **models**: Sequelize models.
- **routes**: Express route definitions.
- **services**: Business logic.
- **utils**: Utility functions.
- **validators**: Request validation schemas.

# API Documentation

The API documentation will be available at `/api-docs` when the server is running. It provides detailed information on each endpoint, including request and response formats.

# Dependencies

- **@types/bcrypt**: Type definitions for bcrypt.
- **@types/jsonwebtoken**: Type definitions for jsonwebtoken.
- **@types/mailgen**: Type definitions for mailgen.
- **@types/multer**: Type definitions for multer.
- **@types/nodemailer**: Type definitions for nodemailer.
- **@types/uuid**: Type definitions for uuid.
- **axios**: Promise based HTTP client for the browser and node.js.
- **compression**: Node.js compression middleware.
- **cookie-parser**: Parse HTTP request cookies.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **express**: Web framework for Node.js.
- **helmet**: Helmet helps secure your Express apps by setting various HTTP headers.
- **http-status**: Utility to interact with HTTP status codes.
- **jimp**: An image processing library.
- **jsonwebtoken**: JSON Web Token implementation.
- **lodash**: A modern JavaScript utility library.
- **mailgen**: Generates email HTML.
- **morgan**: HTTP request logger middleware for node.js.
- **multer**: Middleware for handling multipart/form-data.
- **nodemailer**: Easy as cake email sending from your Node.js applications.
- **pg**: PostgreSQL client for Node.js.
- **sequelize**: Sequelize is a promise-based Node.js ORM.
- **sharp**: High performance Node.js image processing.
- **slugify**: Slugifies a string.
- **uuid**: Generate RFC-compliant UUIDs.
- **winston**: A logger for just about everything.
- **zod**: TypeScript-first schema declaration and validation library.

# Dev Dependencies

- **@babel/preset-env**: Babel preset for compiling ES2015+ syntax.
- **@babel/preset-typescript**: Babel preset for TypeScript.
- **@types/compression**: Type definitions for compression.
- **@types/cookie-parser**: Type definitions for cookie-parser.
- **@types/cors**: Type definitions for cors.
- **@types/express**: Type definitions for express.
- **@types/jest**: Type definitions for Jest.
- **@types/morgan**: Type definitions for morgan.
- **@types/node**: Type definitions for Node.js.
- **babel-jest**: Jest plugin to use Babel for transformation.
- **bcrypt**: A library to help you hash passwords.
- **dotenv**: Module that loads environment variables from a .env file.
- **jest**: JavaScript testing framework.
- **nodemon**: Tool that helps develop Node.js applications by automatically restarting the node application when file changes are detected.
- **sequelize-cli**: Command-line interface for Sequelize.
- **supertest**: Super-agent driven library for testing node.js HTTP servers.
- **ts-node**: TypeScript execution environment and REPL for Node.js.
- **typescript**: TypeScript language support.

# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# License

Distributed under the MIT License. See `LICENSE` for more information.

---

Feel free to reach out if you have any questions or need further assistance!