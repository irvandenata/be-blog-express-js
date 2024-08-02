import { Request } from "express";
import { UserInterface  } from "../interfaces/index";

declare module "express" {
	interface Request {
		userId?: string;
		user?: UserInterface ;
		file?: {
			filename: string;
			fieldname: string;
			originalname: string;
			encoding: string;
			mimetype: string;
			buffer: Buffer;
			size: number;
			path?: string;
		};
	}
}
