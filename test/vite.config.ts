import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";
import fs from "fs";
import ExtractCssComments from "../vite-plugin-extract-css-comments";

export default defineConfig({
  root: "test",
  base: '/solgaleo',
  plugins: [
    solid(),
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
