import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { viteEnvPlugin } from "@repo/envconfigure";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({mode}) => {

  const env = loadEnv(mode, __dirname, "");

  return {
    plugins: [react(), viteEnvPlugin(env)],
  };
});
