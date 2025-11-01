import path, { dirname } from 'path'
import { loadSync } from "@grpc/proto-loader";
import { loadPackageDefinition } from "@grpc/grpc-js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PROTO_PATH = path.resolve(__dirname, "../proto/user.proto");
const protoFile = loadSync(PROTO_PATH);
export const grpcUserService = loadPackageDefinition(protoFile);
