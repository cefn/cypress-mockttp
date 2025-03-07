import { defineConfig } from "cypress";
import webpack from "webpack"
import webpackPreprocessor from "@cypress/webpack-preprocessor";

export default defineConfig({
  e2e: {
    specPattern: './**/*.spec.ts',
    supportFile: false,
    setupNodeEvents(on, config) {
      /** Workarounds for non-browser-compatible deps in mockttp 
       * See https://github.com/httptoolkit/mockttp/issues/188 */
      const webpackOptions : webpack.Configuration = {
        resolve: {
          extensions: [".ts", ".js", ".wasm"],
          fallback: {
            "stream": require.resolve("stream-browserify"),
            "zlib": false, 
            "querystring": false, 
            "path": false, 
            "fs": false 
          } as const
        },
        module: {
          rules: [
            {
              test: /\.wasm$/,
              type: "asset/resource",
            },
          ],
        },
        experiments: {
          asyncWebAssembly: true, 
          syncWebAssembly: true,
        },
        plugins: [
          new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
            process: "process/browser",
          }),
        ]
      };

      on("file:preprocessor", webpackPreprocessor({
        webpackOptions,
      }));

      return config;
    },
  },
});
