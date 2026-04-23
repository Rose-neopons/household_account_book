import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AiModule } from "./ai/ai.module";
import { BudgetsModule } from "./budgets/budgets.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TransactionsModule } from "./transactions/transactions.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AiModule,
    TransactionsModule,
    BudgetsModule
  ]
})
export class AppModule {}
