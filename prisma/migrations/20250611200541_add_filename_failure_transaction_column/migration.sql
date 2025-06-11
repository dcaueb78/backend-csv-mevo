/*
  Warnings:

  - Added the required column `filename` to the `failure-transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "failure-transactions" ADD COLUMN     "filename" TEXT NOT NULL;
