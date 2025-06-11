import { Transactions, TransactionsFailure, TransactionsSuccess } from "./transactions";

export interface TransformFileIntoArrayResponse {
  transactionsWithHeader: Transactions;
}

export interface filterTransactionStatusResponse {
  transactionsSuccess: TransactionsSuccess;
  transactionsFailure: TransactionsFailure;
}

export interface saveTransactionStatusResponse {
  transactionsSuccess: TransactionsSuccess;
  transactionsFailure: TransactionsFailure;
}