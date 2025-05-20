import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pautinka/',
  build: {
    rollupOptions: {
      external: ['framer-motion'], // Явно указываем зависимость как внешнюю
    },
  },
  scss: {
    additionalData: `@import "./cssPages/Posts.scss";`, // Пример импорта глобальных переменных SCSS
  },
  server: {
    allowedHosts: [
      'localhost', // Разрешаем localhost
      'bcdb-77-238-245-33.ngrok-free.app', // Добавляем домен ngrok
    ],
  },
});
