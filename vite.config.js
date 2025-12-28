import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Si lo vas a publicar en GitHub Pages dentro de un repo,
// cambia base a '/NOMBRE_DEL_REPO/'.
export default defineConfig({
  plugins: [react()],
})
