// import { RabbitMQ } from "@obi/rabbitmq";
import express from "express";
import {grpcUserService} from "@obi/grpc"
import * as grpc from '@grpc/grpc-js'
// import { SERVICE_QUEUE } from "./config/services";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// await RabbitMQ.connect();

// RabbitMQ.subscribe(SERVICE_QUEUE.AUTH, async (data) => {
//   console.log("📥 Received:", data);
// });

const userServiceClient = new grpcUserService.user.UserService(
  "localhost:50051", // the server address
  grpc.credentials.createInsecure()
);

app.post("/auth", async (req, res) => {

  const {id} = req.body

  userServiceClient.GetUser({id}, (err , response) => {
     if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(response)
  })
});

app.listen(4000, () => console.log("🚀 API Gateway running on port 4000"));

