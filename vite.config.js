import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Pautinka/',
  build: {
    rollupOptions: {
      external: ['framer-motion'], // Явно указываем зависимость как внешнюю
    },
  },
  scss: {
    // Additional options if needed
    additionalData: `@import "./cssPages/Posts.scss";`, // Example: Import global SCSS variables
  }, server: {
    allowedHosts: [
      'localhost', // Разрешаем localhost
      'bcdb-77-238-245-33.ngrok-free.app', // Добавляем домен ngrok
    ],
  },
})
