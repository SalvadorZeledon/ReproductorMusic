# Reproductor para dedicar (React + Tailwind)

## 1) Instalar
```bash
npm install
npm run dev
```

## 2) Poner tus archivos
- Copia tus audios a: `public/media/`
- Copia tus portadas a: `public/covers/`
- Edita `src/tracks.js` con títulos, artista, rutas, dedicatorias y letra.

## 3) Publicar (para el QR)
Cualquier hosting estático sirve (Vercel/Netlify/GitHub Pages).
- Build: `npm run build`
- Carpeta final: `dist/`

Tip GitHub Pages: en `vite.config.js` cambia `base` a `"/NOMBRE_DEL_REPO/"`.
