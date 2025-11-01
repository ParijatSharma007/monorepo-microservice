import path from 'path'
import { loadSync } from "@grpc/proto-loader";
import { loadPackageDefinition } from "@grpc/grpc-js";


const PROTO_PATH = path.resolve(__dirname, "../proto/user.proto");
const protoFile = loadSync(PROTO_PATH);
export const grpcUserService = loadPackageDefinition(protoFile);
