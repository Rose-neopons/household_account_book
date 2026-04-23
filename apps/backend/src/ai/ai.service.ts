import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type ParsedTransaction = {
  amount: number;
  category: string;
  description: string;
  occurredAt?: string;
  merchant?: string;
  type: "NEED" | "WANT";
};

@Injectable()
export class AiService {
  private readonly apiKey?: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey = this.config.get<string>("GEMINI_API_KEY");
  }

  async parseNaturalLanguage(input: string): Promise<ParsedTransaction> {
    const model = this.getModel();
    const result = await model.generateContent([
      "Extract a household-account transaction as strict JSON.",
      "Return keys: amount, category, description, occurredAt, merchant, type.",
      "type must be NEED or WANT.",
      input
    ]);

    return JSON.parse(result.response.text()) as ParsedTransaction;
  }

  private getModel() {
    if (!this.apiKey) {
      throw new ServiceUnavailableException("GEMINI_API_KEY is not configured.");
    }

    return new GoogleGenerativeAI(this.apiKey).getGenerativeModel({
      model: "gemini-1.5-flash"
    });
  }
}
