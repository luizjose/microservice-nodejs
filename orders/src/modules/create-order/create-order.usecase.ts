import { prismaClient } from "../../infra/database/prismaClient";

type CreateOrderRequest = {
  customerId: string;
  items: [{ productId: string; quantity: number }];
};
export class CreateOrderUseCase {
  async execute(data: CreateOrderRequest) {
    const order = await prismaClient.order.create({
      data: {
        customerId: data.customerId,
        status: "AGUARDANDO_PAGAMENTO",
        OrderItems: {
          createMany: {
            data: data.items,
          },
        },
      },
    });
    return order;
  }
}
