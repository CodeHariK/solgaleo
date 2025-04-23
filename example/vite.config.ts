import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'

export default defineConfig({
  plugins: [
    devtools({
      autoname: true,

      locator: {
        targetIDE: 'vscode',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    solid(),
  ],
  server: {
    port: 8000,
    host: '0.0.0.0',
  },
  build: {
    outDir: "../dist-example",
  },
});
