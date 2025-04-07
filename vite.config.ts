import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import dts from "vite-plugin-dts";
import path from "path";
import ExtractCssComments from "./vite-plugin-extract-css-comments";

export default defineConfig({
  plugins: [
    solid(),
    ExtractCssComments("src"),
    dts({
      outDir: "dist",
      insertTypesEntry: true,
      include: ["src/**/*.ts", "src/**/*.tsx"],
    }),
  ],
  server: {
    port: 9000,
    host: '0.0.0.0',
  },
  build: {
    lib: {
      name: "solgaleo",
      entry: {
        index: path.resolve(__dirname, "src/solgaleo.index.ts"),
        adv: path.resolve(__dirname, "src/adv/solgaleo.adv.ts"),
        fancy: path.resolve(__dirname, "src/fancy/solgaleo.fancy.ts"),
        input: path.resolve(__dirname, "src/input/solgaleo.input.ts"),
        nav: path.resolve(__dirname, "src/nav/solgaleo.nav.ts"),
        pages: path.resolve(__dirname, "src/pages/solgaleo.pages.ts"),
        svg: path.resolve(__dirname, "src/svg/svg.tsx"),
        ui: path.resolve(__dirname, "src/ui/solgaleo.ui.ts"),
      },
      fileName: (format, name) => `solgaleo.${name}.${format}.js`,
    },
    rollupOptions: {
      external: ["solid-js"],
      output: {
        globals: { "solid-js": "SolidJS" },
      },
    },
  },
});
