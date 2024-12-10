import { kafka } from ".";

export const KafkaConsumer = async (topic: string) => {
  const consumer = kafka.consumer({ groupId: "ORDER_APP" });

  await consumer.connect();
  console.log("Consumer 1 running...", topic);

  await consumer.subscribe({ topic, fromBeginning: true });

  return consumer;
};
