import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc"
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      proxy: {
        "/v1": {
          target: env.VITE_NODE_SERVER_API,
          changeOrigin: true,
          secure: false,
        },
        "/v2": {
          target: env.VITE_SPRINGBOOT_SERVER_API,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
});
