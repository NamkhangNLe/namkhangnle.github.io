import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: '.',
 use: { baseURL: 'http://127.0.0.1:4188/', launchOptions: process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {} },
 webServer: { cwd: '..', command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4188', url: 'http://127.0.0.1:4188/', reuseExistingServer: false },
});
