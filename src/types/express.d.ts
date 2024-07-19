import { Request } from "express";
import { User } from "../interfaces/index";

declare module "express" {
	interface Request {
		userId?: string;
		user?: User;
		file?: {
			filename: string;
			fieldname: string;
			originalname: string;
			encoding: string;
			mimetype: string;
			buffer: Buffer;
			size: number;
			filepath?: string;
		};
	}
}
