import { Router, Request, Response } from "express"
import { Readable } from "node:stream";
import readline from 'node:readline'
import multer from "multer"
import { transactionsController } from "./controllers/transactions.controller";

const multerConfig = multer()

const router = Router();

router.post("/file", multerConfig.single("file"), transactionsController.setTransactions)

export { router }