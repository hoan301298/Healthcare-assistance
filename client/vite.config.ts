import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: '/',
    server: {
      proxy: {
        "/v2": {
          target: env.VITE_SPRINGBOOT_SERVER_API,
          changeOrigin: true,
        },
      },
    },

    plugins: [
      react({
        jsxRuntime: "automatic"
      })
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      outDir: "dist",
      sourcemap: false,
      minify: "esbuild"
    }
  };
});
