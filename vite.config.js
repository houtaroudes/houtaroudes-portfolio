import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 5350 is this project's slot in the local port band, so it can run beside the
  // others. strictPort means a taken port fails loudly instead of quietly
  // moving somewhere a check is not looking.
  server: { port: 5350, strictPort: true },
})
