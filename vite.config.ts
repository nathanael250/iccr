import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'next/link', replacement: fileURLToPath(new URL('./src/shims/next-link.tsx', import.meta.url)) },
      { find: 'next/image', replacement: fileURLToPath(new URL('./src/shims/next-image.tsx', import.meta.url)) },
      { find: 'next/navigation', replacement: fileURLToPath(new URL('./src/shims/next-navigation.tsx', import.meta.url)) },
      { find: 'next/font/google', replacement: fileURLToPath(new URL('./src/shims/next-font-google.ts', import.meta.url)) },
      { find: '@vercel/analytics/next', replacement: fileURLToPath(new URL('./src/shims/vercel-analytics-next.tsx', import.meta.url)) },
      { find: 'next', replacement: fileURLToPath(new URL('./src/shims/next.ts', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./', import.meta.url)) },
    ],
  },
})
