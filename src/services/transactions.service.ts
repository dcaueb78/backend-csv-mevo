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
      const isDuplicatedTransaction = validateDuplicatedTransaction(transactionsSuccess, actual)
      const existsInvalidNegativeValue = validadeInvalidNegativeValue(actual)
      const isSuspectTransaction = validateSuspectTransaction(actual)

      const isSuccessTransaction = !isDuplicatedTransaction && !existsInvalidNegativeValue
      if(isSuccessTransaction) {
        transactionsSuccess.push({
          from: actual.from,
          to: actual.to,
          amount: actual.amount,
          isSuspectTransaction
        })
      } else {
        transactionsFailure.push({
          from: actual.from,
          to: actual.to,
          amount: actual.amount,
          reason: mounTransactionFailureReason(isDuplicatedTransaction, existsInvalidNegativeValue)
        })
      }
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

const validateDuplicatedTransaction = (
  transactionsSuccessList: Transactions, 
  selectedTransactionToValidate: Transaction) => {
    return  (
      transactionsSuccessList.some(
        selectedSuccess => selectedSuccess.from === selectedTransactionToValidate.from && 
        selectedSuccess.to === selectedTransactionToValidate.to && 
        selectedSuccess.amount === selectedTransactionToValidate.amount
      )
  )
}

const validadeInvalidNegativeValue = (transactionToValidate: Transaction) => {
  return transactionToValidate.from < 0 || transactionToValidate.to < 0 || transactionToValidate.amount < 0
}

const validateSuspectTransaction = (
  transactionToValidate: Transaction) => {
    return (
      transactionToValidate.from > 5000000 ||
      transactionToValidate.to > 5000000 || 
      transactionToValidate.amount > 5000000
    )
  }

const mounTransactionFailureReason = (isDuplicated: boolean, isNegative: boolean) => {
  if(isDuplicated) {
    return 'Duplicated Value'
  }
  if(isNegative) {
    return 'Negative invalid value'
  }
  return 'Invalid value'
}


export default {
  saveTransactions, 
  filterTransactions
};
