import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/kafka/producer";

type CreateProductRequest = {
  name: string;
  code: string;
  quantity: number;
  price: number;
};
export class CreateProductUseCase {
  constructor() {}

  async execute(data: CreateProductRequest) {
    const product = await prismaClient.product.findFirst({
      where: {
        code: data.code, // Assuming 'id' is the unique identifier, replace 'data.email' with the correct unique identifier if needed
      },
    });
    if (product) {
      throw new Error("Product already exists");
    }
    const productCreated = await prismaClient.product.create({
      data: {
        ...data,
      },
    });
    const kafkaMessage = new KafkaSendMessage();
    await kafkaMessage.execute("PRODUCT_CREATED", {
      id: productCreated.id,
      code: productCreated.code,
    });

    return productCreated;
  }
}
