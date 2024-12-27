import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Exclude dependencies from pre-bundling if necessary
    exclude: ['lucide-react'], // Only include if lucide-react is used and requires exclusion
  },
});
