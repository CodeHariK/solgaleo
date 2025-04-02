import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    solid(),
    dts({
      outDir: "dist",
      insertTypesEntry: true,
      include: ["src/**/*.ts", "src/**/*.tsx"],
    }),
  ],
  build: {
    lib: {
      name: "solgaleo",
      entry: {
        index: path.resolve(__dirname, "src/solgaleo.index.ts"),
        adv: path.resolve(__dirname, "src/solgaleo.adv.ts"),
        fancy: path.resolve(__dirname, "src/solgaleo.fancy.ts"),
        input: path.resolve(__dirname, "src/solgaleo.input.ts"),
        nav: path.resolve(__dirname, "src/solgaleo.nav.ts"),
        pages: path.resolve(__dirname, "src/solgaleo.pages.ts"),
        svg: path.resolve(__dirname, "src/solgaleo.svg.ts"),
        ui: path.resolve(__dirname, "src/solgaleo.ui.ts"),
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
