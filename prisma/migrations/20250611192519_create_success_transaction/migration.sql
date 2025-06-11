-- CreateTable
CREATE TABLE "success-transactions" (
    "id" TEXT NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "isSuspect" BOOLEAN NOT NULL,

    CONSTRAINT "success-transactions_pkey" PRIMARY KEY ("id")
);
