import httpStatus from 'http-status';

import { Readable } from "stream";
import readline from 'node:readline'
import ApiError from "../utils/ApiError";
import { Transaction, } from '../types/transactions';
import { TransformFileIntoArrayResponse } from '../types/response';

const transformFileIntoArray = async (file: Express.Multer.File): Promise<TransformFileIntoArrayResponse> => {
  try {
    
      const buffer = file?.buffer;
    
      if (!buffer) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid CSV file');
      }
    
      const readableFile = Readable.from(buffer);
      const transactionsInLine = readline.createInterface({
        input: readableFile
      })
      const transactionsWithHeader: Transaction[] = []
    
      for await (let line of transactionsInLine) {
        const transactionsSplit = line.split(';')
    
        transactionsWithHeader.push({
          from: Number(transactionsSplit[0]),
          to: Number(transactionsSplit[1]),
          amount: Number(transactionsSplit[2]),
        })
      }

      return { transactionsWithHeader }

    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occurred.');
    }
}

export default {
  transformFileIntoArray,
};
