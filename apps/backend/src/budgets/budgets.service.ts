import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

type UpsertBudgetInput = {
  monthlyLimit: number;
  period: string;
};

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  current() {
    const period = new Date().toISOString().slice(0, 7);

    return this.prisma.budget.findUnique({
      where: { period }
    });
  }

  upsert(input: UpsertBudgetInput) {
    return this.prisma.budget.upsert({
      where: { period: input.period },
      create: input,
      update: { monthlyLimit: input.monthlyLimit }
    });
  }
}
