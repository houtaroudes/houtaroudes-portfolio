import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 5340 is this project's slot in the local port band, so it can run beside the
  // others. strictPort means a taken port fails loudly instead of quietly
  // moving somewhere a check is not looking.
  server: { port: 5340, strictPort: true },
});
