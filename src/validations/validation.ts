import {ZodType} from 'zod';
import AppError from '../utils/appError';

export class Validation {
    static validate<T>(schema: ZodType<T>, data: any): T {
        try {
            return schema.parse(data);
        } catch (error : any) {
            let message: string = "";
            error.errors.forEach((err: any) => {
                message += err.path.join(".") + " : " + err.message + ". ";
            });
            throw new AppError(400, message);
        }
    }
}