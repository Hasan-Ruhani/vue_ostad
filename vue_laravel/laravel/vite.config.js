import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: [
            ],
            refresh: true,
        }),
    ],
});
