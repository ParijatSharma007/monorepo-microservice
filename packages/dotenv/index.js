import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";

const mode = process.env.NODE_ENV
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const _beforeDotENV = structuredClone(process.env);

dotenv.config({
    path : [`.env`, `.env.local`, `.env.${mode}`, `.env.${mode}.local`].map((env) => path.resolve(__dirname, `../../${env}`)),
})

const _afterDotENV = structuredClone(process.env);


export const viteEnvPlugin = (env) => {
    return {
        name: 'vite-env-plugin',
        config: () => {
            return {
                define: {
                    'process.env': Object.assign(_afterDotENV, env ?? _beforeDotENV)
                }
            }
        }
    }
}
