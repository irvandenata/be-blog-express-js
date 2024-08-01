import { error } from "console";

    export default class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    name: string;
    status: string;
    errors?: any;

    constructor(
        statusCode: number,
        message: string,
        isOperational: boolean = true,
        name: string = "Error",
        stack: string = "",
        errors?: any
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.name = name;
        this.status = statusCode.toString().startsWith('4') ? "fail" : "error"
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}