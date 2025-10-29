import { RabbitMQ } from "@obi/rabbitmq";
import express from "express";
import { SERVICE_QUEUE } from "./config/services";

const app = express();
app.use(express.json());

await RabbitMQ.connect();

RabbitMQ.subscribe(SERVICE_QUEUE.AUTH, async (data) => {
  console.log("📥 Received:", data);
});

app.post("/auth", async (req, res) => {
  const { message } = req.body;
  await RabbitMQ.publish(SERVICE_QUEUE.AUTH, { message });
  res.json({ status: "Message published" });
});

app.listen(4000, () => console.log("🚀 API Gateway running on port 4000"));
