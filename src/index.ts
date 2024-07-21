'use strict';

import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import ErrorHandler from "./middlewares/errorHandler"

ErrorHandler.initializeUncaughtException() // initialize uncaught exception

import app from "./app"
import db from "./models/connection"
const PORT = process.env.PORT || 8000

db.authenticate()
    .then(() => console.log(`Connected to ${db.config.database} successfully`))
    .catch((err:any) => console.log(`Unable to connect ${db.config.database}:`, err.message))

db.sync({ force: false })
    .then(() => console.log(`Synced to ${db.config.database} successfully`))
    .catch((err:any) => console.log(`Unable to sync ${db.config.database}:`, err))

const server = app.listen(PORT, () => {
    console.log(`Server is awake on port ${PORT}:${process.env.NODE_ENV}`);
})

ErrorHandler.initializeUnhandledRejection(server) // initialize unhandled rejection

export default server;
