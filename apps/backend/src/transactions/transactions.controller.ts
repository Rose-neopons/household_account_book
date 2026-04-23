import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { ParseTransactionDto } from "./dto/parse-transaction.dto";
import { TransactionsService } from "./transactions.service";

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(dto);
  }

  @Post("parse")
  parse(@Body() dto: ParseTransactionDto) {
    return this.transactionsService.parse(dto.input);
  }
}
