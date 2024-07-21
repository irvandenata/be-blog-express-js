import {z, ZodType} from 'zod';


export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        name: z.string().min(3).max(255),
        email: z.string().email(),
        password: z.string().min(8).max(255),
    });

    static readonly LOGIN: ZodType = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(255),
    });
}
    