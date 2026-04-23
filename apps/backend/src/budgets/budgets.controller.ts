import { Body, Controller, Get, Post } from "@nestjs/common";
import { BudgetsService } from "./budgets.service";

type UpsertBudgetDto = {
  monthlyLimit: number;
  period: string;
};

@Controller("budgets")
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get("current")
  current() {
    return this.budgetsService.current();
  }

  @Post()
  upsert(@Body() dto: UpsertBudgetDto) {
    return this.budgetsService.upsert(dto);
  }
}
