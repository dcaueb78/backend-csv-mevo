import type { Request, RequestHandler, Response } from "express";
import httpStatus from 'http-status';

import transactionsService from "../services/transactions.service";

class TransactionsController {
	public setTransactions: RequestHandler = async (req: Request, res: Response) => {
		const { file } = req;

		if(!file) {
			throw new Error('')
		}
		
await transactionsService.saveTransactions(file);

		res.status(httpStatus.CREATED).send();
	};
}

export const transactionsController = new TransactionsController();
