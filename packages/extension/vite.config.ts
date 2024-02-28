import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import manifest from './manifest.config'

export default defineConfig({
    plugins: [
        react(),
        crx({ manifest })
    ],
    build: {
        rollupOptions: {
            input: {
                side_panel: 'src/side_panel/page.html',
                offscreen: 'src/offscreen/page.html',
            },
        },
    },
})