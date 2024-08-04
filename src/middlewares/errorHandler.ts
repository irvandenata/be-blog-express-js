import { Server } from "http";
import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import CustomError from "../utils/customError";
import logging from "../utils/logging";
import fs from "fs";
// import { Sequelize, ValidationError, Error, ValidationErrorItem } from "sequelize"

export default class ErrorHandler {
    static convert =
        () => (err: Error, req: Request, res: Response, next: NextFunction) => {
            let error: CustomError;

            if (!(err instanceof AppError)) {
                error = err as CustomError;

                // set initial statusCode to 400 if not already set
                //convert error to BaseError
                error.statusCode = error.statusCode || httpStatus.BAD_REQUEST;

                // convert errors conditionally
                if (error.name === "JsonWebTokenError") {
                    error.message = "Invalid session.";
                    error.statusCode = httpStatus.UNAUTHORIZED;
                } else if (error.name === "TokenExpiredError") {
                    error.message = "Session expired. Please log in again.";
                    error.statusCode = httpStatus.UNAUTHORIZED;
                } else if (error.name === "NotBeforeError") {
                    error.message = "Session not active. Please log in again.";
                    error.statusCode = httpStatus.UNAUTHORIZED;
                } else {
                    error.statusCode =
                        error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
                    error.message =
                        error.message ||
                        (httpStatus[
                            error.statusCode as keyof typeof httpStatus
                        ] as string);
                    error.isOperational = false;
                }
                // recreate the error object with the new arguments
                error = new AppError(
                    error.statusCode,
                    error.message,
                    error.isOperational,
                    error.name,
                    error.stack
                );
            } else {
                error = err;
            }
            // pass the error to the actual error handler middleware
            next(error);
        };

    static handle =
        () =>
        (err: AppError, req: Request, res: Response, next: NextFunction) => {
            err.statusCode = err.statusCode || 500;

            if (err.statusCode === 401)
                res.clearCookie(process.env.COOKIE_NAME as string);
            // // handling errors acoording to node_env'
            if (process.env.NODE_ENV === "production") {
                this.sendErrorProd(err, req, res);
            } else if (process.env.NODE_ENV === "development") {
                this.sendErrorDev(err, res);
            } else {
                this.sendErrorTest(err, req, res);
            }
        };

    static initializeUncaughtException = () => {
        process.on("uncaughtException", (err: Error) => {
            console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
            console.log(err.name, err.message, err.stack);
            process.exit(1);
        });
    };

    static initializeUnhandledRejection = (server: Server) => {
        process.on(
            "unhandledRejection",
            (reason: Error, promise: Promise<any>) => {
                console.log("UNHANDLED REJECTION! 💥 Shutting down...");
                console.log(reason.name, reason.message, reason.stack);
                server.close(() => {
                    process.exit(1);
                });
            }
        );
    };

    // static initializeSIGTERMlistener = (server: Server, db: Sequelize) => {
    //     process.on('SIGTERM', () => {
    //         console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    //         db.close()
    //         server.close(() => {
    //             console.log('💥 Process terminated!');
    //         });
    //     })
    // }

    // static initializeSIGINTlistener = (server: Server, db: Sequelize) => {
    //     process.on('SIGINT', () => {
    //         console.log('👋 SIGINT RECEIVED. Shutting down gracefully');
    //         db.close()
    //         server.close(() => {
    //             console.log('💥 Process terminated!');
    //         });
    //     });
    // }

    private static sendErrorDev = (err: AppError, res: Response) => {
        // 1) log error to console
        console.log(`-------------${err.name}------------`);
        console.log("headersSent: ?", res.headersSent);
        console.log("isOperational: ?", err.isOperational);
        console.log(err.message);
        console.log("-------------stack----------------");
        console.log(err.stack);
        console.log("----------------------------------");

        if (err.statusCode === 500) {
            this.loggingError(err);
        }
        if (err.statusCode === 400) {
            console.log(err.message);
            err["messages"] = err.message.split("\n").map((message) => {
                return message.replace("notNull Violation: ", "").replace("Validation error: ", "");
            });
        }
        logging.error(err.message, err.stack);
        // 2) send error message to client
        res.status(err.statusCode).send({
            status: err.status,
            error: err,
            name: err.name,
            message: err.message,
            stack: err.stack,
        });
    };

    private static sendErrorTest = (
        err: AppError,
        req: Request,
        res: Response
    ) => {
        // Operational, trusted error: send message to client

        // check if the headers is sent

        if (!res.headersSent) {
            res.status(err.statusCode).send({
                status: err.status,
                message: err.message,
            });
        } else {
            console.log("-------headers sent error----------");
            console.log(`-------------${err.name}------------`);
            console.log(err.message);
            console.log("-------------stack----------------");
            console.log(err.stack);
            console.log("----------------------------------");
        }
        // Programming or other unknown error: don't leak error details
    };

    private static sendErrorProd = (
        err: AppError,
        req: Request,
        res: Response
    ) => {
        // Operational, trusted error: send message to client
        if (err.isOperational || err.statusCode !== 500) {
            // check if the headers is sent
            if (!res.headersSent) {

                if (err.statusCode === 400) {
                    err["errors"] = err.message.split("\n").map((message) => {
                        return message.replace("notNull Violation: ", "").replace("Validation error: ", "");
                    });
                    err.message = "Invalid input data. Please try again!";
                }
                res.status(err.statusCode).send(
                    {
                        status: err.status,
                        message: err.message,
                        errors: err.errors,
                    }
                );
            } else {
                console.log("-------headers sent error----------");
                console.log(`-------------${err.name}------------`);
                console.log(err.message);
                console.log("-------------stack----------------");
                console.log(err.stack);
                console.log("----------------------------------");
            }
            // Programming or other unknown error: don't leak error details
        } else {
            // 1) Log error
            console.error("ERROR 💥", err);
            // 2) Send generic message if header is not sent
            !res.headersSent &&
                res.status(500).send({
                    status: "Error",
                    message: "Something went wrong!",
                });
        }
    };

    private static loggingError = (err: AppError) => {
        // log the error to a file
        let message = `=================================================\nTime of error: ${new Date().toUTCString()}\nError: ${
            err.message
        } \n Stack: ${
            err.stack
        }\n================================================= \n \n`;

        let locationFile = "./logs/error.log";

        fs.appendFile(locationFile, message, (err) => {
            if (err) {
                console.log(err);
            }
        });
    };

    // private static convertSequelizeError = (err: ValidationError) => {
    //     // create a custom message for Sequelize validation errors
    //     let concattedMessage = err.errors.map((e: ValidationErrorItem) => e.message).join('. ');
    //     err.message = `Invalid input: ${concattedMessage}`;
    //     return err;
    // }
}
