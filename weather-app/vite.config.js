import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/documents": {
        target: "http://server-cluster-ip-service:8888",
        changeOrigin: true,
      },
      "/api/weather": {
        target: "http://server-cluster-ip-service:8888",
        changeOrigin: true,
      },
      "/api/citylist": {
        target: "http://server-cluster-ip-service:8888",
        changeOrigin: true,
      },
      "/api/history": {
        target: "http://server-cluster-ip-service:8888",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
