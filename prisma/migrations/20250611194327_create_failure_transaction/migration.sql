-- CreateTable
CREATE TABLE "failure-transactions" (
    "id" TEXT NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "Reason" TEXT NOT NULL,

    CONSTRAINT "failure-transactions_pkey" PRIMARY KEY ("id")
);
