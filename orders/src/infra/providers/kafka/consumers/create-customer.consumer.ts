import { prismaClient } from "../../../database/prismaClient";
import { KafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
  id: string;
  email: string;
};

export async function createCustomerConsumer() {
  const consumer = await KafkaConsumer("CUSTOMER_CREATED");

  console.log("Consumer running...", "CUSTOMER_CREATED");

  await consumer.subscribe({ topic: "CUSTOMER_CREATED", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageToString = message.value!.toString();
      console.log(`message received from topic ${topic}: ${messageToString}`);
      const customer = JSON.parse(messageToString) as CustomerConsumer;
      console.log(
        `message received from topic CUSTOMER_CREATED: ${JSON.stringify(
          customer
        )}`
      );
      try {
        await prismaClient.customer.create({
          data: {
            externalId: customer.id,
            email: customer.email,
          },
        });
        console.log("Customer created successfully");
      } catch (error) {
        console.error("Error creating customer: ", error);
      }
    },
  });
}

createCustomerConsumer();
