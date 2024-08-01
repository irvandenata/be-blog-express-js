import { Response, NextFunction, RequestHandler } from "express";
import catchAsync from "../utils/catchAsync";
import AuthService from "../services/authService";
const authService = new AuthService();

const isLoggedIn: RequestHandler = catchAsync(async (req: any, res: Response, next: NextFunction) => {
	const data = await authService.checkUserSession(req.cookies[process.env.COOKIE_NAME as string]);
	// assign the user id to the request object and pass it to the next middleware
	req.userId = data.id;
	req.user = data;
	return next();
});

export default isLoggedIn;
