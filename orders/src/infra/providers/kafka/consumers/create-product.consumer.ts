import { Kafka } from "kafkajs";
import { prismaClient } from "../../../database/prismaClient";
import { KafkaConsumer } from "../kafka.consumer";

type ProductConsumer = {
  id: string;
  code: string;
};

export async function createProductConsumer() {
  const consumer = await KafkaConsumer("PRODUCT_CREATED");
  await consumer.subscribe({ topic: "PRODUCT_CREATED", fromBeginning: true });
  console.log("Consumer running...", "PRODUCT_CREATED");
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageToString = message.value!.toString();
      const product = JSON.parse(messageToString) as ProductConsumer;
      console.log(
        `message received from topic ${topic}: ${JSON.stringify(product)}`
      );
      try {
        await prismaClient.product.create({
          data: {
            externalId: product.id,
            code: product.code,
          },
        });
        console.log("Product created successfully");
      } catch (error) {
        console.error("Error creating product: ", error);
      }
    },
  });
  consumer.on("consumer.crash", async (event: any) => {
    console.log("Consumer crashed", event);
  });
}

createProductConsumer();
