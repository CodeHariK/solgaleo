import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";
import fs from "fs";

import devtools from 'solid-devtools/vite'

import ExtractCssComments from "../vite-plugin-extract-css-comments";

export default defineConfig({
  root: "test",
  base: '/solgaleo',
  server: {
    port: 8888,
    host: '0.0.0.0',
  },
  plugins: [
    solid(),

    devtools({
      autoname: true,
      // pass `true` or an object with options
      locator: {
        targetIDE: 'vscode',
        componentLocation: true,
        jsxLocation: true,
      },
    }),

    ExtractCssComments("test"),
    {
      name: 'copy-404',
      writeBundle() {
        fs.copyFileSync('test/404.html', 'dist-test/404.html');
      }
    },
    {
      name: 'copy-logo',
      writeBundle() {
        fs.copyFileSync('test/logo.png', 'dist-test/logo.png');
      }
    }
  ],
  build: {
    outDir: "../dist-test",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // Ensure Vite finds the entry file
    },
  },
});
