import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";
import ExtractCssComments from "../vite-plugin-extract-css-comments";

export default defineConfig({
  root: "test",
  plugins: [
    solid(),
    ExtractCssComments("test")
  ],
  build: {
    outDir: "../dist-test",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // Ensure Vite finds the entry file
    },
  },
});
