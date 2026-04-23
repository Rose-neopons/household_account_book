import { Injectable } from "@nestjs/common";
import { AiService } from "../ai/ai.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService
  ) {}

  findAll() {
    return this.prisma.transaction.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  create(dto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: dto
    });
  }

  parse(input: string) {
    return this.aiService.parseNaturalLanguage(input);
  }
}
