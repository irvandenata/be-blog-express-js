import path from "path";
import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser"; // menguraikan cookie header dan mengisi req.cookies dengan objek yang berisi kunci nilai cookie
import compression from "compression"; // middleware kompresi yang berfungsi untuk mengompresi respon HTTP dengan gzip atau deflate
import cors from "cors"; // middleware yang memungkinkan aplikasi untuk menerima permintaan dari sumber daya yang berbeda
// import helmet from "helmet"; // middleware yang membantu melindungi aplikasi dengan mengatur berbagai header HTTP
import morgan from "morgan"; // middleware logger HTTP untuk node.js
import api from "./api"; // import api from folder api
import ErrorHandler from "./middlewares/errorHandler"
const app: Application = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

app.use(cors());


// app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../", "images"))); // mengakses folder images

app.use(`/api/${process.env.API_VERSION}`, api);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});


app.use(ErrorHandler.convert());
app.use(ErrorHandler.handle());

export default app;