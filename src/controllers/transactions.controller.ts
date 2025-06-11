import type { Request, RequestHandler, Response } from "express";
import httpStatus from 'http-status';

import transactionsService from "../services/transactions.service";

class TransactionsController {
	public setTransactions: RequestHandler = async (req: Request, res: Response) => {
		const { file } = req;

		if(!file) {
			throw new Error('')
		}
		
		const { transactionsFailure, transactionsSuccess } = await transactionsService.saveTransactions(file);
		const resData = {
			validtransactions: transactionsSuccess.length,
			invalidTransactions: transactionsFailure
		}
		res.status(httpStatus.CREATED).json(resData).send();
	};
}

export const transactionsController = new TransactionsController();
