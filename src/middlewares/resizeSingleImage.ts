import { Request, Response, NextFunction } from "express";
import Jimp from "jimp"; // berfungsi untuk mengubah ukuran gambar
import fs from "fs"; // berfungsi untuk membaca file
import { v4 as uuidv4 } from "uuid"; // berfungsi untuk membuat id unik
import slugify from "slugify"; // berfungsi untuk membuat slug
import catchAsync from "../utils/catchAsync";
import path from "path";

const resizeSignleImage = (
    name: string,
    path: string,
    width?: number,
    height?: number,
    quality?: number,
    format: "jpeg" | "png" | "jpg" = "jpg"
) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            if (!req.file) return next();
            let fileSlug = name;

            if (name === "profileImage")
                fileSlug = slugify(
                    `${req.user!.firstName} ${req.user!.lastName}`,
                    { lower: true }
                );
            if (name === "blogImage")
                fileSlug = slugify(
                    `${
                        req.body.title ? req.body.title : req.file.originalname
                    }`,
                    { lower: true }
                );

            let filePath: string = req.file.path!;

            fs.readFile(filePath, (err, data) => {
                if (err) throw err;
                Jimp.read(data)
                    .then((image) => {
                        // Manipulasi gambar
                        return image
                            .resize(256, 256) // Ubah ukuran
                            .quality(60) // Atur kualitas
                            .writeAsync(filePath); // Simpan gambar
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
