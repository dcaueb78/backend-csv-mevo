import httpStatus from 'http-status';

import { Readable } from "stream";
import readline from 'node:readline'
import ApiError from "../utils/ApiError";
import { csvService } from './index';
import { Transaction, Transactions, TransactionsFailure, TransactionsSuccess } from '../types/transactions';
import { filterTransactionStatusResponse, saveTransactionStatusResponse } from '../types/response';

  
const saveTransactions = async (file: Express.Multer.File) : Promise<saveTransactionStatusResponse> => {
  try {
    const { transactionsWithHeader } = await csvService.transformFileIntoArray(file)
    const { transactionsFailure, transactionsSuccess } = await filterTransactions(transactionsWithHeader)

    //database save
    return { transactionsFailure, transactionsSuccess }


  } catch (error) {
    const errorMessage = `Error saving transactions: $${(error as Error).message}`;
    throw new Error('')
    // return ServiceResponse.failure(
    //   "An error occurred while saving transactions.",
    //   null,
    //   httpStatus.INTERNAL_SERVER_ERROR,
    // );
  }
}


const filterTransactions = async (transactionsWithHeader: Transaction[]): Promise<filterTransactionStatusResponse> => {
  try {
    const transactionsWithouthHeader = transactionsWithHeader.splice(1)
    
    const transactionsSuccess: TransactionsSuccess = []
    const transactionsFailure: TransactionsFailure = []

    for await(let actual of transactionsWithouthHeader) {
      
  }

  return { transactionsFailure, transactionsSuccess }

  } catch (error) {
    throw new Error('')
    // const errorMessage = `Error saving transactions: $${(error as Error).message}`;
    // return ServiceResponse.failure(
    //   "An error occurred while saving transactions.",
    //   null,
    //   httpStatus.INTERNAL_SERVER_ERROR,
    // );
  }
}




export default {
  saveTransactions, 
  filterTransactions
};
