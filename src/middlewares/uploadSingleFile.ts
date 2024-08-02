import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import AppError from "../utils/appError";
import { File } from "../interfaces";
import fs from "fs";

// configure disk storage option
const storeOnDisk = (path?: string) => {
    // create folder if not exist
    const dir = path ? `public/uploads/images/${path}` : "public/uploads/images/";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return multer.diskStorage({
        destination: (req: Request, file: File, cb: Function) => {
            cb(null, path ? `public/uploads/images/${path}` : "public/uploads/images/");
        },
        filename: (req: Request, file: File, cb: Function) => {
            const ext = file.mimetype.split("/")[1];
            let fileName: string;
            fileName = path + "-" + uuidv4() + "-" + `.${ext}`;
            cb(null, fileName);
        },
    });
};

// configure memory storage option
const memoryStorage = multer.memoryStorage();

const fileFilter = (req: Request, file: File, cb: Function) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(
            new AppError(400, "Only .png, .jpg and .jpeg formats are allowed!")
        );
    }
};

const uploadSingleFile = (
    fieldName: string,
    strType: "memory" | "disk",
    path?: string
) => {
    return (req: any, res: Response, next: NextFunction) => {
        const upload = multer({
            storage:
                strType && strType === "memory"
                    ? memoryStorage
                    : storeOnDisk(path),
            fileFilter: fileFilter,
        }).single(fieldName);
        return upload(req, res, function (err) {
            if (err) {
                // handle file count limit error exclusively
                if (err.code === "LIMIT_UNEXPECTED_FILE") {
                    return next(
                        new AppError(400, "Uploadable file limit exceeded!")
                    );
                }
                return next(
                    new AppError(400, err.message, true, err.name, err.stack)
                );
            }
            // jump to next middleware if no error
            next();
        });
    };
};

export default uploadSingleFile;
