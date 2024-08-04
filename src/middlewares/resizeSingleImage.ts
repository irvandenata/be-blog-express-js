import { Request, Response, NextFunction } from "express";
import Jimp from "jimp"; // berfungsi untuk mengubah ukuran gambar
import sharp from "sharp"; // berfungsi untuk mengubah ukuran gambar
import fs from "fs"; // berfungsi untuk membaca file
import catchAsync from "../utils/catchAsync";

const resizeSignleImage = (
    width: number = 0,
    height: number = 0,
    quality: number = 0,
    format: "jpeg" | "png" | "jpg" | "webp" = "webp"
) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            if (!req.file) return next();
            let filePath: string = req.file.path!;
            quality = quality || 0;
            let newFilePath = filePath.replace(
                `.${req.file.mimetype.split("/")[1]}`,
                ""
            );

            let image = await sharp(filePath);
            if (width > 0 && height > 0) {
                image = image.resize(width, height);
            }
            if (quality > 0) {
                image = image.jpeg({ quality: quality });
            }
            await image.toFile(newFilePath + ".webp", (err, info) => {
                if (err) {
                    console.log(err);
                }
                if (fs.existsSync(filePath)) {
                    fs.unlink(filePath, (err) => {
                        if (err) throw err;
                    });
                }
            });
            if (req.file) {
                req.file.path = newFilePath + ".webp";
            }

            // await fs.readFile(filePath, async (err, data) => {
            //     if (err) throw err;
            //     let convert = sharp(data).toFormat(format);

            //     if (width > 0 && height > 0) {
            //         convert = convert.resize(width, height);
            //     }
            //     if (quality > 0) {
            //         convert = convert.jpeg({ quality: quality });
            //     }
            //     convert.toFile(newFilePath + ".webp", (err) => {
            //         console.log(err);
            //     });
            //     if (req.file) {
            //         req.file.path = newFilePath + ".webp";
            //     }
            //     if (fs.existsSync(filePath)) {
            //         fs.unlink(filePath, (err) => {
            //             if (err) throw err;
            //         });
            //     }
            // });
            next();
        }
    );
};

export default resizeSignleImage;
