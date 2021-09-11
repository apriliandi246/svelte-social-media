import path from "path";
import pkg from "./package.json";
import url from "@rollup/plugin-url";
import babel from "@rollup/plugin-babel";
import svelte from "rollup-plugin-svelte";
import replace from "@rollup/plugin-replace";
import config from "sapper/config/rollup.js";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import aliasFactory from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === "MISSING_EXPORT" && /'preload'/.test(warning.message)) ||
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);

const rootPath = require("path").resolve(__dirname, "src");

const alias = aliasFactory({
  entries: [
    {
      find: "$components",
      replacement: `${rootPath}/components`,
    },
    {
      find: "$store",
      replacement: `${rootPath}/store`,
    },
    {
      find: "$utils",
      replacement: `${rootPath}/utils`,
    },
    {
      find: "$config",
      replacement: `${rootPath}/config`,
    },
  ],
});

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          "process.browser": true,
          "process.env.NODE_ENV": JSON.stringify(mode),
        },
      }),
      svelte({
        compilerOptions: {
          dev,
          hydratable: true,
        },
      }),
      url({
        sourceDir: path.resolve(__dirname, "src/node_modules/images"),
        publicPath: "/client/",
      }),
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      alias,

      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          babelHelpers: "runtime",
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead",
              },
            ],
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          "process.browser": false,
          "process.env.NODE_ENV": JSON.stringify(mode),
        },
      }),
      svelte({
        compilerOptions: {
          dev,
          generate: "ssr",
          hydratable: true,
        },
        emitCss: false,
      }),
      url({
        sourceDir: path.resolve(__dirname, "src/node_modules/images"),
        publicPath: "/client/",
        emitFiles: false, // already emitted by client build
      }),
      resolve({
        dedupe: ["svelte"],
      }),
      commonjs(),
      alias,
    ],
    external: Object.keys(pkg.dependencies).concat(
      require("module").builtinModules
    ),
    preserveEntrySignatures: "strict",
    onwarn,
  },
};
