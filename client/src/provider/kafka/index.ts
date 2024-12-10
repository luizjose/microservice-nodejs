import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
  retry: {
    retries: 10,
    initialRetryTime: 300,
    multiplier: 2,
  },
});

export { kafka };
