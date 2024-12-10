import { Request, Response } from "express";
import { UpdateOrderUseCase } from "./update-order.usecase";

export class UpdateOrderController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const useCase = new UpdateOrderUseCase();
    const result = await useCase.execute(req.body);

    return res.json(result);
  }
}
