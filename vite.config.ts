import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@configs": path.resolve(__dirname, "configs"),
      "@schemas": path.resolve(__dirname, "schemas"),
      "@stores": path.resolve(__dirname, "stores"),
      "@libs": path.resolve(__dirname, "libs"),
    },
  },
});
