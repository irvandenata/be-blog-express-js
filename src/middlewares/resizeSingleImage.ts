import { Request, Response, NextFunction } from "express";
import sharp from "sharp" // berfungsi untuk mengubah ukuran gambar
import { v4 as uuidv4 } from "uuid" // berfungsi untuk membuat id unik
import slugify from "slugify" // berfungsi untuk membuat slug
import catchAsync from "../utils/catchAsync";


const resizeSignleImage = (name: string, path: string, width?: number, height?: number, quality?: number, format: "jpeg" | "png" | "jpg" = "jpg") => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file) return next();
        let fileSlug = name
        if (name === "profileImage") fileSlug = slugify(`${req.user!.firstName} ${req.user!.lastName}`, { lower: true })
        if (name === "blogImage") fileSlug = slugify(`${req.body.title ? req.body.title : req.file.originalname}`, { lower: true })
        req.file.filename = `${fileSlug}-${uuidv4()}.${format}`;
        req.file.filepath = `${path}/${req.file.filename}`;

        await sharp(req.file.buffer)
            .resize(width, height)
            .toFormat(format)
            .jpeg({ quality })
            .toFile(`images/${path}/${req.file.filename}`);
        next();
    })
}

export default resizeSignleImage