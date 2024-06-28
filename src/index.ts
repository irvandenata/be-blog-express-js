import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import createError from "http-errors"

const prisma = new PrismaClient()
const app = express()

app.use(express.json())


// TODO: Routing aplikasi akan kita tulis di sini



app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello World" })
})
// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  res.status(404).json({ message: "Not Found" })
})

app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:3000`)
)