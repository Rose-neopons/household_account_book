CREATE EXTENSION IF NOT EXISTS vector;

CREATE TYPE "TransactionType" AS ENUM ('NEED', 'WANT');

CREATE TABLE "Transaction" (
  "id" TEXT NOT NULL,
  "amount" INTEGER NOT NULL,
  "category" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "type" "TransactionType" NOT NULL,
  "aiFeedback" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "embedding" vector(768),

  CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Budget" (
  "id" TEXT NOT NULL,
  "monthlyLimit" INTEGER NOT NULL,
  "currentSpend" INTEGER NOT NULL DEFAULT 0,
  "period" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Budget_period_key" ON "Budget"("period");
