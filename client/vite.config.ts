import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"
import path from "path";

export default defineConfig({
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/v2": {
        target: "http://localhost:5001",
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
});
