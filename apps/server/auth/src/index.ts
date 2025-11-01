import { grpcUserService } from "@obi/grpc";
import * as grpc from "@grpc/grpc-js";

const server = new grpc.Server();

server.addService(grpcUserService.user.UserService.service, {
  GetUser: (call, callback) => {
    const { id } = call.request;
    const user = { id, name: "John Doe" };
    callback(null, user);
  },
});

const PORT = "0.0.0.0:50051";

server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error("❌ Failed to bind server:", err);
    return;
  }

  server.start(); // ✅ still used, but inside callback
  console.log(`🚀 gRPC server running on port ${port}`);
});