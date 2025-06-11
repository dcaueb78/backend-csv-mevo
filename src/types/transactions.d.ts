export interface Transaction {
  from: number;
  to: number;
  amount: number;
}

export type Transactions = Transaction[]

export interface TransactionFailure extends Transaction {
  reason: string;
}

export type TransactionsFailure = TransactionFailure[]

export interface TransactionSuccess extends Transaction {
  isSuspectTransaction: boolean;
}

export type TransactionsSuccess = TransactionSuccess[]
