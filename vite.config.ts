import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 4300,
        host: '0.0.0.0',
        strictPort: true,
        allowedHosts: ['.ngrok-free.app']
    }
});

