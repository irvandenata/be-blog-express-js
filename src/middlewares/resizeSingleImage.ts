import { Request, Response, NextFunction } from "express";
import Jimp from "jimp"; // berfungsi untuk mengubah ukuran gambar
import fs from "fs"; // berfungsi untuk membaca file
import { v4 as uuidv4 } from "uuid"; // berfungsi untuk membuat id unik
import slugify from "slugify"; // berfungsi untuk membuat slug
import catchAsync from "../utils/catchAsync";
import path from "path";

const resizeSignleImage = (
width?: number,
height?: number,
quality?: number,
format: "jpeg" | "png" | "jpg" = "jpg"
) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            if (!req.file) return next();
            let filePath: string = req.file.path!;
            width = width || 0;
            height = height || 0;
            quality = quality || 0;
            fs.readFile(filePath, (err, data) => {
                if (err) throw err;
                Jimp.read(data)
                    .then((image) => {
                        if (width && height) {
                            image.resize(width, height);
                        }
                        if (quality) {
                            image.quality(quality);
                        }
                        return image.writeAsync(filePath);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
            next();
        }
    );
};

export default resizeSignleImage;
