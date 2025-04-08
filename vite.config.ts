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
        adv: path.resolve(__dirname, "src/adv/gen.ts"),
        fancy: path.resolve(__dirname, "src/fancy/gen.ts"),
        layouts: path.resolve(__dirname, "src/layouts/gen.ts"),
        modal: path.resolve(__dirname, "src/modal/gen.ts"),
        nav: path.resolve(__dirname, "src/nav/gen.ts"),
        pages: path.resolve(__dirname, "src/pages/gen.ts"),
        svg: path.resolve(__dirname, "src/svg/gen.ts"),
        ui: path.resolve(__dirname, "src/ui/gen.ts"),
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
