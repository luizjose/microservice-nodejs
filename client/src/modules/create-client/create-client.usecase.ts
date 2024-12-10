import { kafka } from "../../provider/kafka";
import { KafkaSendMessage } from "../../provider/kafka/producer";
import { prismaClient } from "./../../infra/database/prismaClient";
type CreateClientRequest = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export class CreateClientUseCase {
  constructor() {}

  async execute(data: CreateClientRequest) {
    const customer = await prismaClient.client.findFirst({
      where: {
        email: data.email, // Assuming 'id' is the unique identifier, replace 'data.email' with the correct unique identifier if needed
      },
    });
    if (customer) {
      throw new Error("Client already exists");
    }
    const customerCreated = await prismaClient.client.create({
      data: {
        ...data,
      },
    });

    const kafkaProducer = new KafkaSendMessage();
    await kafkaProducer.execute("CUSTOMER_CREATED", {
      id: customerCreated.id,
      email: customerCreated.email,
    });

    return customerCreated;
  }
}
