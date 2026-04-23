import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateTransactionDto {
  @IsInt()
  @Min(0)
  amount!: number;

  @IsString()
  category!: string;

  @IsString()
  description!: string;

  @IsIn(["NEED", "WANT"])
  type!: "NEED" | "WANT";

  @IsOptional()
  @IsString()
  aiFeedback?: string;
}
