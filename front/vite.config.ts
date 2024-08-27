import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import {resolve} from "node:path";

const frontPort = Number(process.env.FRONT_PORT) || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: frontPort,
  },
});
