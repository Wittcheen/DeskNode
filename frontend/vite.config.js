import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import avoidBarrelFiles from './plugins/avoid-barrel-files.js';

import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools(), avoidBarrelFiles()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        minify: "terser",
        terserOptions: {
            format: { comments: false }
        }
    }
});
