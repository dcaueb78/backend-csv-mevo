-- AlterTable
ALTER TABLE "failure-transactions" ALTER COLUMN "from" SET DATA TYPE BIGINT,
ALTER COLUMN "to" SET DATA TYPE BIGINT,
ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "success-transactions" ALTER COLUMN "from" SET DATA TYPE BIGINT,
ALTER COLUMN "to" SET DATA TYPE BIGINT,
ALTER COLUMN "amount" SET DATA TYPE BIGINT;
