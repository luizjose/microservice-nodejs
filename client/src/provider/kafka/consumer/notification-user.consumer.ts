import { prismaClient } from "../../../infra/database/prismaClient";
import { KafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
  customerId: string;
  status: string;
};

export async function createCustomerConsumer() {
  const consumer = await KafkaConsumer("ORDER_STATUS");
  console.log("Consumer running...", "CUSTOMER_CREATED");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageToString = message.value!.toString();
      console.log(`message received from topic ${topic}: ${messageToString}`);
      const statusConsumer = JSON.parse(messageToString) as CustomerConsumer;

      console.log(
        `ATUALIZAÇÃO DE STATUS- Client:, ${statusConsumer.customerId} - Status: ${statusConsumer.status}`
      );
    },
  });
}

createCustomerConsumer();
